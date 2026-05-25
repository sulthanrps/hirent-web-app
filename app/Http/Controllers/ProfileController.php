<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;       // Tambahkan ini untuk enkripsi password
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;    // Tambahkan ini untuk menghapus foto lama
use Illuminate\Validation\Rule;            // Tambahkan ini untuk validasi email unik
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request)
    {
        $user = $request->user();

        // 1. Validasi Input
        $request->validate([
            'name'             => ['required', 'string', 'max:255'],
            'email'            => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'phone_number'     => ['nullable', 'string', 'max:20'],
            'photo'            => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:2048'], // Maksimal 2MB
            'current_password' => ['nullable', 'required_with:password', 'current_password'],
            'password'         => ['nullable', 'min:8', 'confirmed'],
        ]);

        // 2. Update Data Dasar
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone_number = $request->phone_number;

        // 3. Logika Upload Foto Profil
        if ($request->hasFile('photo')) {
            // Hapus foto lama jika ada, agar storage tidak bengkak
            if ($user->profile_picture && Storage::exists('public/' . $user->profile_picture)) {
                Storage::delete('public/' . $user->profile_picture);
            }

            // Simpan foto baru ke folder storage/app/public/profile_photos
            $path = $request->file('photo')->store('profile_photos', 'public');
            $user->profile_picture = $path; // <-- Ganti di sini
        }

        // 4. Logika Ganti Password
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        // 5. Reset verifikasi email jika email diubah (Opsional bawaan Laravel)
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return back()->with('success', 'Profil berhasil diperbarui!');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}