package com.mvp.users_service.service;

import com.mvp.users_service.exception.ResourceNotFoundException;
import com.mvp.users_service.model.Usuario;
import com.mvp.users_service.model.UsuarioDTO;
import com.mvp.users_service.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public Usuario crearUsuario(UsuarioDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setNombre(dto.getNombre());
        usuario.setCorreo(dto.getCorreo());
        usuario.setPassword(dto.getPassword()); // Nota: En producción, hashear la contraseña
        return repository.save(usuario);
    }

    public Usuario loginUsuario(String correo, String password) {
        Usuario usuario = repository.findByCorreo(correo)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con correo: " + correo));

        if (!usuario.getPassword().equals(password)) {
            throw new IllegalArgumentException("Credenciales incorrectas");
        }

        return usuario;
    }

    public List<Usuario> listarUsuarios() {
        return repository.findAll();
    }

    public Usuario obtenerUsuario(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + id));
    }
}