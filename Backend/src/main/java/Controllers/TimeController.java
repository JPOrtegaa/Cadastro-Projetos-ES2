package Controllers;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import Entidades.Time;
import Servicos.TimeServicos;

@RestController
public class TimeController {
	
	private TimeServicos servicos;
	
	public TimeController() {
		servicos = new TimeServicos();
	}
	
	@PostMapping("/time/inserir")
	public void inserirTime(@RequestBody Time t) {
		
		if(t.getListaProfissional() == null)
			System.out.println("Lista NULL!!!");
		
		servicos.inserirTime(t);
			
	}
	
	@GetMapping("/time/{id}")
	public Time obterTimeByID(@PathVariable long id) {
		Time t;
		t = servicos.obterTimeByID(id);
		
		return t;
	}
	
	@GetMapping("/time/listar")
	public ArrayList<Time> obterListaTimes(){
		ArrayList<Time> listaTimes = servicos.obterListaTimes();
		
		return listaTimes;
	}
	
	@PutMapping("/time/atualizar")
	void atualizarTime(@RequestBody Time t) {
		servicos.atualizarTime(t);
	}
	
	@DeleteMapping("/time/deletar")
	void deletarTime(@RequestBody Time t) {
		servicos.deletarTime(t);
	}
	
}
