package Servicos;

import java.util.ArrayList;

import DAO.ProjetoDao;
import Entidades.Projeto;

public class ProjetoServicos {
	
	private ProjetoDao daoProjeto;
	
	public ProjetoServicos() {
		daoProjeto = new ProjetoDao();
	}
	
	public void inserirProjeto(Projeto p) {
		daoProjeto.postProjeto(p);
	}
	
	public Projeto obterProjetoByID(Projeto p) {
		return daoProjeto.getProjetoByID(p);
	}
	
	public ArrayList<Projeto> obterListaProjetos(){
		return daoProjeto.getListaProjetos();
	}
	
	public void atualizarProjeto(Projeto p) {
		daoProjeto.putProjeto(p);
	}
	
	public void deletarProjeto(Projeto p) {
		daoProjeto.deleteProjeto(p);
	}
	
}
