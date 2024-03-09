package Controllers;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import Entidades.Raca;
import Servicos.RacaServicos;

@RestController
public class RacaController {
	
	private RacaServicos servicos;
	
	public RacaController() {
		this.servicos = new RacaServicos();
	}
	
	@GetMapping("/raca/listar")
	public ArrayList<Raca> obterListaRacas(){
		
		return servicos.obterListaRacas();
		
	}
	
	@GetMapping("/raca/{id}")
	public Raca obterRacaByID(@PathVariable long id) {
		Raca r = new Raca();
		r.setIdRaca(id);
		
		r = servicos.obterRacaByID(r);
		
		return r;
	}
	
}
