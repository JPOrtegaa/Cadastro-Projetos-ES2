package Controllers;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import Entidades.Profissional;
import Servicos.ProfissionalServicos;

@RestController
public class ProfissionalController {
	
	private ProfissionalServicos servicos;
	
	public ProfissionalController() {
		this.servicos = new ProfissionalServicos();
	}
	
	@PostMapping("/profissional/inserir")
	public void inserirProfissional(@RequestBody Profissional p) {
		
		servicos.inserirProfissional(p);
		
		
	}
	
	@PostMapping("/profissional/inserir")
	public void inserirProfissional(@RequestBody Profissional p) {
		
		servicos.inserirProfissional(p);
		
		
	}
	
	@GetMapping("/profissional/{id}")
	public Profissional obterProfissionalByID(@PathVariable long id) {
		Profissional p = new Profissional();
		p.setIdProfissional(id);
		
		return servicos.obterProfissionalByID(p);
	}
	
	@GetMapping("/profissional/listar")
	public ArrayList<Profissional> obterListaProfissionais() {
		ArrayList<Profissional> lista = servicos.obterListaProfissionais();
		
		if(!lista.isEmpty())
			return lista;
		return null;
	}
	
	
	@PutMapping("/profissional/atualizar")
	public void atualizarProfissional(@RequestBody Profissional p) {
		
		servicos.atualizarProfissional(p);
		
	}
	
	
	@DeleteMapping("/profissional/deletar")
	public void deletarProfissional(@RequestBody Profissional p) {
		
		servicos.deletarProfissional(p);
		
	}
	
	
	
	
	
}
