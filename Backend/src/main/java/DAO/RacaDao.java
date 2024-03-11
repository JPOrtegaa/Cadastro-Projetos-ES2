package DAO;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import Banco.BancoSQL;
import Entidades.Raca;

public class RacaDao {
	
	private BancoSQL banco;
	
	public RacaDao() {
		this.banco = new BancoSQL(/*"root", "jp17", "es2-projeto1-final"*/);
	}
	
	public ArrayList<Raca> getListaRaca(){
		String query = "SELECT * FROM Raca";
		ArrayList<Raca> listaRaca = new ArrayList<>();
		ResultSet rs;
		
		banco.setConnection();
		rs = banco.select(query);
		
		try {
			while(rs.next()) {
				Raca r = new Raca();
				r.setIdRaca(rs.getLong(1));
				r.setNomeRaca(rs.getString(2));
				listaRaca.add(r);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		banco.closeConnection();
		
		return listaRaca;
	}
	
	public Raca getRacaByID(Raca r) {
		String query = "SELECT * FROM Raca WHERE idRaca = " + r.getIdRaca() + ";";
		ResultSet rs;
		Raca raca = null;
		
		
		banco.setConnection();
		
		rs = banco.select(query);
		
		try {
			while(rs.next()) {
				raca = new Raca();
				raca.setIdRaca(rs.getLong(1));
				raca.setNomeRaca(rs.getString(2));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		banco.closeConnection();
		
		return raca;
	}
	

}
