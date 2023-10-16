<?php
    
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;

class BookController extends Controller
{
    // Listar todos los libros
    public function index()
    {
        $books = Book::all();
        return response()->json($books);
    }

    // Mostrar un libro específico
    public function show($id)
    {
        $book = Book::find($id);
        return response()->json($book);
    }

    // Crear un nuevo libro
    public function store(Request $request)
    {
        $book = new Book;
        $book->fill($request->all());
        $book->save();
        return response()->json($book, 201);
    }

    // Actualizar un libro
    public function update(Request $request, $id)
    {
        $book = Book::find($id);
        $book->update($request->all());
        return response()->json($book);
    }

    // Eliminar un libro
    public function destroy($id)
    {

        $book = Book::find($id);
        $book->delete();
        return response()->json(['message' => 'Libro eliminado']);
    }
}
