<?php

namespace App\Http\Controllers\Api;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $criptografia =  Hash::make($request->password);

            $email = User::whereRaw('email = ?',[$request->email])->first();
    
            if (isset($email['email'])) {
                return response()->json(['messege' => 'Email Já existe na base de dados', 'error' => true],200);
            }
    
            $save = User::create(
                [
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => $criptografia
                ]
            );

            return response()->json($save,200);
    
        } catch (\Exception  $e) {
            return response()->json(['messege' => 'Engraçadinho não fique removendo os requireds dos campos pelo console do navegador!', 'error' => true],200);
        }
      
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}