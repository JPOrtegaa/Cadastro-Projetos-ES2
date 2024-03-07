package DAO;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import Banco.BancoSQL;
import Entidades.Profissional;

public class ProfissionalDao {
	
	private BancoSQL banco;
	
	public ProfissionalDao() {
		banco = new BancoSQL("root", "jp17", "es2-projeto1");
	}
	
	public Profissional getProfissionalByID(Profissional p) {
		String query = "SELECT * From Profissional WHERE idProfissional=" + p.getIdProfissional() + ";";
		ResultSet rs;
		
		Profissional pro = null;
		
		banco.setConnection();
		
		rs = banco.select(query);
		
		try {
			while(rs.next()) {
				pro = new Profissional();
				pro.setNomeProfissional(rs.getString(2));
				pro.setDataNascimento(rs.getDate(3).toString());
				pro.setGeneroProfissional(rs.getString(4));
				pro.setRacaProfissional(rs.getString(5));
				pro.setEspecialidadeProfissional(rs.getString(6));
				pro.setEnderecoProfissional(rs.getString(7));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		banco.closeConnection();
		
		return pro;
	}
	
	public ArrayList<Profissional> getTodosProfissionais(){
		ArrayList<Profissional> listaProfissional = new ArrayList<>();
		String query = "SELECT * FROM Profissional";
		ResultSet rs;
		
		banco.setConnection();
		
		rs = banco.select(query);
		
		try {
			while(rs.next()) {
				Profissional pro = new Profissional();
				
				pro.setNomeProfissional(rs.getString(2));
				pro.setDataNascimento(rs.getDate(3).toString());
				pro.setGeneroProfissional(rs.getString(4));
				pro.setRacaProfissional(rs.getString(5));
				pro.setEspecialidadeProfissional(rs.getString(6));
				pro.setEnderecoProfissional(rs.getString(7));
				
				listaProfissional.add(pro);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		banco.closeConnection();
		
		return listaProfissional;
	}
	
	public void putProfissional(Profissional p) {
		long id = p.getIdProfissional();
		String nome = p.getNomeProfissional();
		String data = p.getDataNascimento();
		String genero = p.getGeneroProfissional();
		String raca = p.getRacaProfissional();
		String especialidade = p.getEspecialidadeProfissional();
		String endereco = p.getEnderecoProfissional();
		
		String query = "UPDATE Profissional "
					 + "SET nomeProfissional = '" + nome 
					 + "', dataNascimento = '" + data
					 + "', generoProfissional = '" + genero
					 + "', racaProfissional = '" + raca
					 + "', especialidadeProfissional = '" + especialidade
					 + "', enderecoProfissional = '" + endereco
					 + "' WHERE idProfissional = " + id + ";";
		
		System.out.println(query);
		
		banco.setConnection();
		
		banco.update(query);
		
		banco.closeConnection();
	}
	
}
