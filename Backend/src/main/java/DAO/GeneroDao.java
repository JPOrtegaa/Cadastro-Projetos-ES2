package DAO;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import Banco.BancoSQL;
import Entidades.Genero;

public class GeneroDao {
	
	private BancoSQL banco;
	
	public GeneroDao() {
		this.banco = new BancoSQL("root", "jp17", "es2-projeto1-final");
	}
	
	public ArrayList<Genero> getListaGeneros(){
		String query = "SELECT * FROM Genero";
		ArrayList<Genero> listaGenero = new ArrayList<>();
		ResultSet rs;
		
		banco.setConnection();
		rs = banco.select(query);
		
		try {
			while(rs.next()) {
				Genero g = new Genero();
				g.setIdGenero(rs.getLong(1));
				g.setNomeGenero(rs.getString(2));
				listaGenero.add(g);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		banco.closeConnection();
		
		return listaGenero;
	}
	
	public Genero getGeneroByID(Genero g) {
		String query = "SELECT * FROM Genero WHERE idGenero = " + g.getIdGenero() + ";";
		Genero gen = null;
		ResultSet rs;
		
		banco.setConnection();
		rs = banco.select(query);
		
		try {
			while(rs.next()) {
				gen = new Genero();
				gen.setIdGenero(rs.getLong(1));
				gen.setNomeGenero(rs.getString(2));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		banco.closeConnection();
		
		return gen;
	}

}
