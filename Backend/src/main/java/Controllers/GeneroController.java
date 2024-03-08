package Controllers;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import Entidades.Genero;
import Servicos.GeneroServicos;

@RestController
public class GeneroController {
	
	private GeneroServicos servicos;
	
	public GeneroController() {
		this.servicos = new GeneroServicos();
	}
	
	@GetMapping("/genero/listar")
	public ArrayList<Genero> obterListaGeneros(){
		
		
		return servicos.obterListaGeneros();
	}
	
	@GetMapping("/genero/{id}")
	public Genero obterGeneroByID(@PathVariable long id) {
		Genero g = new Genero();
		g.setIdGenero(id);
		
		g = servicos.obterGeneroByID(g);
		
		return g;
	}
	
	
	
}
