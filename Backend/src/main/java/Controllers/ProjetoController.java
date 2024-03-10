package Controllers;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	public void inserirProjeto(@RequestBody Projeto p) {
		servicos.inserirProjeto(p);
	}
	
	
	@GetMapping("/projeto/{id}")
	public Projeto obterProjetoByID(@PathVariable long id) {
		Projeto p = new Projeto();
		p.setIdProjeto(id);
		
		return servicos.obterProjetoByID(p);
	}
	
	@GetMapping("/projeto/listar")
	public ArrayList<Projeto> obterListaProjetos(){
		return servicos.obterListaProjetos();
	}
	
	@PutMapping("/projeto/atualizar")
	public void atualizarProjeto(@RequestBody Projeto p) {
		servicos.atualizarProjeto(p);
	}
	
	@DeleteMapping("/projeto/deletar")
	public void deletarProjeto(@RequestBody Projeto p) {
		servicos.deletarProjeto(p);
	}
	
}
