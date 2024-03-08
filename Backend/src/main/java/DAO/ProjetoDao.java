package DAO;

import Banco.BancoSQL;

public class ProjetoDao {
	
	private BancoSQL banco;
	
	public ProjetoDao() {
		this.banco = new BancoSQL("root", "jp17", "es2-projeto1-final");
	}
	
	
}
