<?php

namespace App\Http\Controllers\Api;

use App\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $id_user = Auth::user();
        $allCategory = Category::where('id_user', $id_user->id)->get();

        return response()->json($allCategory, 200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $idUser = Auth::user();
        if (!$request->name) {
            return response()->json([
                'error' => true,
                'messege' => 'Preencha todos os campos!'
            ],401);
        }
        
        $storeCategory = Category::create([
            'name' => $request->name,
            'id_user' => $idUser->id
        ]);

        return response()->json($storeCategory, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $updateCategory = Category::find($id);
        $updateCategory->update($request->all());

        return response()->json($updateCategory, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $destroyCategory = Category::destroy($id);
            return response()->json($destroyCategory, 200);
        } catch (\Throwable $th) {
            return response()->json($th, 400);
        }
       
    }
}
