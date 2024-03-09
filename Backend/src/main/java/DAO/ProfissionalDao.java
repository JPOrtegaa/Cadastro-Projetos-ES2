package DAO;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import Banco.BancoSQL;
import Entidades.Genero;
import Entidades.Profissional;
import Entidades.Raca;

public class ProfissionalDao {
	
	private BancoSQL banco;
	private GeneroDao daoGenero;
	private RacaDao daoRaca;
	
	public ProfissionalDao() {
		banco = new BancoSQL("root", "jp17", "es2-projeto1-final");
		daoGenero = new GeneroDao();
		daoRaca = new RacaDao();
	}
	
	public void postProfissional(Profissional p) {
		String query = "INSERT INTO Profissional (nomeProfissional, dataNascimento, "
					 + "especialidadeProfissional, enderecoProfissional, Genero_idGenero, Raca_idRaca) "
				 	 + "VALUES ('" + p.getNomeProfissional() + "', "
				 	 + "'" + p.getDataNascimento() + "', "
				 	 + "'" + p.getEspecialidadeProfissional() + "', "
				 	 + "'" + p.getEnderecoProfissional() + "', "
				 	 + p.getGeneroProfissional().getIdGenero() + ", "
				 	 + p.getRacaProfissional().getIdRaca() + ");";
		
		banco.setConnection();
		
		banco.insert(query);
		
		banco.closeConnection();
	}
	
	public Profissional getProfissionalByID(Profissional p) {
		String query = "SELECT * From Profissional WHERE idProfissional=" + p.getIdProfissional() + ";";
		ResultSet rs;
		
		Profissional pro = null;
		Genero g = null;
		Raca r = null;
		
		banco.setConnection();
		
		rs = banco.select(query);
		
		try {
			while(rs.next()) {
				pro = new Profissional();
				
				g = new Genero();
				g.setIdGenero(rs.getLong(6));
				
				r = new Raca();
				r.setIdRaca(rs.getLong(7));
				
				pro.setIdProfissional(rs.getLong(1));
				pro.setNomeProfissional(rs.getString(2));
				pro.setDataNascimento(rs.getDate(3).toString());
				pro.setEspecialidadeProfissional(rs.getString(4));
				pro.setEnderecoProfissional(rs.getString(5));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		banco.closeConnection();
		
		g = daoGenero.getGeneroByID(g);
		r = daoRaca.getRacaByID(r);
		
		pro.setGeneroProfissional(g);
		pro.setRacaProfissional(r);
		
		return pro;
	}
	
	public ArrayList<Profissional> getTodosProfissionais(){
		String query = "SELECT * FROM Profissional";

		ArrayList<Profissional> listaProfissional = new ArrayList<>();
		ArrayList<Genero> listaGenero = new ArrayList<>();
		ArrayList<Raca> listaRaca = new ArrayList<>();
		
		ResultSet rs;
		
		banco.setConnection();
		
		rs = banco.select(query);
		
		try {
			while(rs.next()) {
				Profissional pro = new Profissional();
				Genero g = new Genero();
				Raca r = new Raca();
				
				g.setIdGenero(rs.getLong(6));
				r.setIdRaca(rs.getLong(7));
				
				pro.setIdProfissional(rs.getLong(1));
				pro.setNomeProfissional(rs.getString(2));
				pro.setDataNascimento(rs.getDate(3).toString());
				pro.setEspecialidadeProfissional(rs.getString(4));
				pro.setEnderecoProfissional(rs.getString(5));
				
				listaProfissional.add(pro);
				listaGenero.add(g);
				listaRaca.add(r);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		banco.closeConnection();
		
		for (int i = 0; i < listaRaca.size(); i++) {
			Raca r = listaRaca.get(i);
			r = daoRaca.getRacaByID(r);
			
			Genero g = listaGenero.get(i);
			g = daoGenero.getGeneroByID(g);
			
			listaProfissional.get(i).setRacaProfissional(r);
			listaProfissional.get(i).setGeneroProfissional(g);
		}
		
		return listaProfissional;
	}
	
	public void putProfissional(Profissional p) {
		long id = p.getIdProfissional();
		String nome = p.getNomeProfissional();
		String data = p.getDataNascimento();
		Genero genero = p.getGeneroProfissional();
		Raca raca = p.getRacaProfissional();
		String especialidade = p.getEspecialidadeProfissional();
		String endereco = p.getEnderecoProfissional();
		
		String query = "UPDATE Profissional "
					 + "SET nomeProfissional = '" + nome 
					 + "', dataNascimento = '" + data
					 + "', Genero_idGenero = " + genero.getIdGenero()
					 + ", Raca_idRaca = " + raca.getIdRaca()
					 + ", especialidadeProfissional = '" + especialidade
					 + "', enderecoProfissional = '" + endereco
					 + "' WHERE idProfissional = " + id + ";";
		
		System.out.println(query);
		
		banco.setConnection();
		
		banco.update(query);
		
		banco.closeConnection();
	}
	
	public void deleteProfissionalTime(Profissional p) {
		String query = "DELETE FROM Time_Profissional WHERE Profissional_idProfissional = "
					 + p.getIdProfissional() + ";";
		
		banco.setConnection();
		banco.delete(query);
		banco.closeConnection();
	}
	
	public void deleteProfissional(Profissional p) {
		String query = "DELETE FROM Profissional WHERE idProfissional = " + p.getIdProfissional() + ";";
		
		deleteProfissionalTime(p);
		
		banco.setConnection();
		banco.delete(query);
		banco.closeConnection();
		
	}
	
}
