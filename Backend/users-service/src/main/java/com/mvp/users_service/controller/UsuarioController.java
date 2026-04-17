package com.mvp.users_service.controller;

import com.mvp.users_service.model.LoginDTO;
import com.mvp.users_service.model.Usuario;
import com.mvp.users_service.model.UsuarioDTO;
import com.mvp.users_service.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Usuario> crearUsuario(@Valid @RequestBody UsuarioDTO dto) {
        Usuario usuario = service.crearUsuario(dto);
        return ResponseEntity.ok(usuario);
    }

    @PostMapping("/login")
    public ResponseEntity<Usuario> loginUsuario(@Valid @RequestBody LoginDTO dto) {
        Usuario usuario = service.loginUsuario(dto.getCorreo(), dto.getPassword());
        return ResponseEntity.ok(usuario);
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        List<Usuario> usuarios = service.listarUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Usuario> obtenerUsuario(@PathVariable Long id) {
        Usuario usuario = service.obtenerUsuario(id);
        return ResponseEntity.ok(usuario);
    }
}