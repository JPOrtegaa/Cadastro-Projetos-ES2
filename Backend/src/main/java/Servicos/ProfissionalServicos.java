package Servicos;

import java.util.ArrayList;

import DAO.ProfissionalDao;
import Entidades.Profissional;

public class ProfissionalServicos {
	
	private ProfissionalDao daoProfissional;
	
	public ProfissionalServicos() {
		daoProfissional = new ProfissionalDao();
	}
	
	public void inserirProfissional(Profissional p) {
		daoProfissional.postProfissional(p);
	}
	
	public Profissional obterProfissionalByID(Profissional p) {
		Profissional pro;
		pro = daoProfissional.getProfissionalByID(p);
		
		return pro;
	}
	
	public ArrayList<Profissional> obterListaProfissionais(){
		return daoProfissional.getTodosProfissionais();
	}
	
	
	public void atualizarProfissional(Profissional p) {
		daoProfissional.putProfissional(p);
	}
	
	public void deletarProfissional(Profissional p) {
		daoProfissional.deleteProfissional(p);
	}

}
