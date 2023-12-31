<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class IncidenciaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'detalle_incidencia' => 'required',
            'usu_alias'  =>  'required',
            'email'  =>  'required',
            'departamento'  =>  'required',
        ];
    }

    public function messages(): array
    {
        return [
            'detalle_incidencia.required' =>  'La actividad es obligatoria',
            'usu_alias.required' =>  'El usuario es obligatorio',
            'email.required' =>  'El correo es obligatorio',
            'departamento.required' =>  'El usuario es obligatorio',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
