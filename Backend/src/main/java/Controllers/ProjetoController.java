package Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import Entidades.Projeto;
import Servicos.ProjetoServicos;

@RestController
public class ProjetoController {
	
	private ProjetoServicos servicos;
	
	public ProjetoController() {
		this.servicos = new ProjetoServicos();
	}
	
	@PostMapping("/projeto/inserir")
	public void inserirProjeto(@PathVariable Projeto p) {
		
		
		
		
	}
	
	
	@GetMapping("/projeto/{id}")
	public Projeto obterProjetoByID(@PathVariable long id) {
		
		
	}
	
	
	
	
}
