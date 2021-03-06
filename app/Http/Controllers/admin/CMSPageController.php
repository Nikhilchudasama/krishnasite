<?php

namespace App\Http\Controllers\admin;

use App\CMSPage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use App\Menu;
class CMSPageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $cmspages = CMSPage::paginate(10);
      return view('admin.cmspage.index', compact('cmspages'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $menus = Menu::where('status','1')->get();
        return view('admin.cmspage.add',compact('menus'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $validatedData = request()->validate(CMSPage::validationRules());
      $image = "";
      if(Input::hasFile('image'))
      {
          $filename = str_replace(" ","_",strtolower(Input::get('image')));
          $fileInstance = Input::file('image');
          $extension = Input::file('image')->getClientOriginalExtension();
          $image = "slider".$filename."_".time().".".$extension;
          $file = $fileInstance->move('upload/images/cmspage/',$image);
          $validatedData['image'] = $image;


      }
      $cMSPage = CMSPage::create($validatedData);
      return redirect()->route('cmspage.index')->with(['type' => 'success', 'message' => 'CMSPage added']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\CMSPage  $cMSPage
     * @return \Illuminate\Http\Response
     */
    public function show(CMSPage $cMSPage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\CMSPage  $cMSPage
     * @return \Illuminate\Http\Response
     */
    public function edit(CMSPage $cmspage)
    {
        $menus = Menu::where('status','1')->get();
        return view('admin.cmspage.edit', compact('cmspage','menus'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\CMSPage  $cMSPage
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CMSPage $cmspage)
    {
      $validatedData = request()->validate(CMSPage::validationRules($cmspage->id));
      if(Input::hasFile('image'))
      {
          if($cmspage->image != ''){
              $path = $_SERVER['DOCUMENT_ROOT'].dirname($_SERVER['SCRIPT_NAME'])."/upload/images/cmspage/".$cmspage->image;
              unlink($path);
          }
          $filename = str_replace(" ","_",strtolower(Input::get('image')));
          $fileInstance = Input::file('image');
          $extension = Input::file('image')->getClientOriginalExtension();
          $image = "cmsimage".$filename."_".time().".".$extension;
          $file = $fileInstance->move('upload/images/cmspage/',$image);
          $validatedData['image'] = $image;
      }
      $cmspage->update($validatedData);

      return redirect()->route('cmspage.index')->with(['type' => 'success', 'message' => 'CMSPage Updated']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\CMSPage  $cMSPage
     * @return \Illuminate\Http\Response
     */
    public function destroy(CMSPage $cmspage)
    {
      if($cmspage->image != ''){
          $path = $_SERVER['DOCUMENT_ROOT'].dirname($_SERVER['SCRIPT_NAME'])."/upload/images/cmspage/".$cmspage->image;
          unlink($path);
      }
      $cmspage->delete();
      return;
    }
}
