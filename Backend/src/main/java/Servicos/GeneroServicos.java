package Servicos;

import java.util.ArrayList;

import DAO.GeneroDao;
import Entidades.Genero;

public class GeneroServicos {
	
	private GeneroDao daoGenero;
	
	public GeneroServicos() {
		this.daoGenero = new GeneroDao();
	}
	
	public ArrayList<Genero> obterListaGeneros(){
		ArrayList<Genero> listaGeneros;
		
		listaGeneros = daoGenero.getListaGeneros();
		
		return listaGeneros;
	}
	
	public Genero obterGeneroByID(Genero g) {
		g = daoGenero.getGeneroByID(g);
		
		return g;
	}
	

}
