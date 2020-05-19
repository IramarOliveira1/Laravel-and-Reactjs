<?php

namespace App\Http\Controllers\Api;

use App\Produto;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ProdutoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $id_user = Auth::user();
        $products = Produto::where('id_user', $id_user->id)->get();
        foreach ($products as $product) {
           $product->categoria;
        }
        
        return response()->json($products, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        $id_user = Auth::user();
        $storeProducts = Produto::create([
            'name' => $request->name,
            'quantidade' => $request->quantidade,
            'preco' => $request->preco,
            'id_categoria' => $request->categoriesId,
            'id_user' => $id_user->id
        ]);
       
        return response()->json($storeProducts, 200);
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
        $updateProducts = Produto::find($id);
        $updateProducts->update($request->all());
        return response()->json($updateProducts, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $destroyProducts = Produto::destroy($id);

        return response()->json($destroyProducts, 200);
    }
}
