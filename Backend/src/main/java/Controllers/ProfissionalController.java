package Controllers;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	@GetMapping("/teste")
	public String teste() {
		return "Salve!";
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
	
	
	
	
	
}
