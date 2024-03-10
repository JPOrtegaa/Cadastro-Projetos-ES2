package Servicos;

import java.util.ArrayList;

import DAO.RacaDao;
import Entidades.Raca;

public class RacaServicos {
	
	private RacaDao daoRaca;
	
	public RacaServicos() {
		this.daoRaca = new RacaDao();
	}
	
	public ArrayList<Raca> obterListaRacas(){
		ArrayList<Raca> listaRacas;
		
		listaRacas = daoRaca.getListaRaca();
		
		return listaRacas;
	}
	
	public Raca obterRacaByID(Raca r) {
		Raca raca = daoRaca.getRacaByID(r);
		
		return raca;
		
	}

}
