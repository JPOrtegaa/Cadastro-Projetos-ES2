package DAO;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import Banco.BancoSQL;
import Entidades.Profissional;
import Entidades.Time;

public class TimeDao {
	
	private BancoSQL banco;
	private ProfissionalDao daoProfissional;
	private long idTimeBase = 8;
	
	public TimeDao() {
		banco = new BancoSQL("root", "jp17", "es2-projeto1-final");
		daoProfissional = new ProfissionalDao();
	}
	
	public void postTimeProfissional(Time t) {
		banco.setConnection();
		
		for (Profissional p : t.getListaProfissional()) {
			String query = "INSERT INTO Time_Profissional (Time_idTime, Profissional_idProfissional) "
						 + "VALUES (" + t.getIdTime() + ", " + p.getIdProfissional() + ");";
			banco.insert(query);
		}
		
		banco.closeConnection();
	}
	
	public void postTime(Time t) {
		String query = "INSERT INTO Time (nomeTime) "
					 + "VALUES ('" + t.getNomeTime() + "');";
		Time novo;
		
		banco.setConnection();
		banco.insert(query);
		banco.closeConnection();
		
		if(t.getListaProfissional() != null) {
			novo = getTimeByNome(t);
			novo.setListaProfissional(t.getListaProfissional());
			postTimeProfissional(novo);			
		}
	}
	
	public Time getTimeByNome(Time t) {
		String query = "SELECT * FROM Time WHERE nomeTime = '" + t.getNomeTime() + "';";
		ResultSet rs;
		Time timePesquisado = null;
		
		banco.setConnection();
		rs = banco.select(query);
		
		try {
			while(rs.next()) {
				timePesquisado = new Time();
				timePesquisado.setIdTime(rs.getLong(1));
				timePesquisado.setNomeTime(rs.getString(2));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		banco.closeConnection();
		
		return timePesquisado;
	}
	
	public void getTimeProfissional(Time t) {
		ArrayList<Profissional> listaProfissional = new ArrayList<>();
		ArrayList<Long> listaID = new ArrayList<>();
		ResultSet rs;
		
		String query = "SELECT * FROM Time_Profissional WHERE Time_idTime = " + t.getIdTime() + ";";
		
		banco.setConnection();
		rs = banco.select(query);
		
		try {
			while(rs.next()) {
				listaID.add(rs.getLong(2));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		banco.closeConnection();
		
		while(!listaID.isEmpty()) {
			Profissional p = new Profissional();
			p.setIdProfissional(listaID.remove(0));
			p = daoProfissional.getProfissionalByID(p);
			listaProfissional.add(p);
		}
		
		t.setListaProfissional(listaProfissional);
	}
	
	public Time getTimeByID(Time t) {
		String query = "SELECT * FROM Time WHERE idTime = '" + t.getIdTime() + "';";
		ResultSet rs;
		Time timePesquisado = null;
		
		banco.setConnection();
		rs = banco.select(query);
		
		try {
			while(rs.next()) {
				timePesquisado = new Time();
				timePesquisado.setIdTime(rs.getLong(1));
				timePesquisado.setNomeTime(rs.getString(2));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		banco.closeConnection();
		
		if(timePesquisado != null)
			getTimeProfissional(timePesquisado);
		
		return timePesquisado;
	}
	
	public ArrayList<Time> getTodosTimes(){
		String query = "SELECT * FROM Time";
		ArrayList<Time> listaTimes = new ArrayList<>();
		
		ResultSet rs;
		
		banco.setConnection();		
		rs = banco.select(query);
		
		try {
			while(rs.next()) {
				Time t = new Time();
				t.setIdTime(rs.getLong(1));
				t.setNomeTime(rs.getString(2));
				listaTimes.add(t);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		banco.closeConnection();
		
		for (Time time : listaTimes) {
			getTimeProfissional(time);
		}
		
		return listaTimes;
	}
	
	public void deleteTimeProfissional(Time t) {
		banco.setConnection();
		
		for (Profissional p : t.getListaProfissional()) {
			String query = "DELETE FROM Time_Profissional "
						 + "WHERE Time_idTime = " + t.getIdTime() + " AND "
						 + "Profissional_idProfissional = " + p.getIdProfissional() + ";";
			banco.delete(query);
		}
		
		banco.closeConnection();
	}
	
	public void deleteTimeProjeto(Time t) throws SQLException {
		String query = "SELECT * FROM Projeto WHERE Time_idTime = " + t.getIdTime() + ";";
		ArrayList<Long> listaIdProjeto = new ArrayList<>();
		ResultSet rs;
		
		banco.setConnection();
		rs = banco.select(query);
		
		while(rs.next()) {
			listaIdProjeto.add(rs.getLong(1));
		}
		
		while(!listaIdProjeto.isEmpty()) {
			long idProjeto = listaIdProjeto.remove(0);
			query = "UPDATE Projeto SET Time_idTime = " + this.idTimeBase
				  + " WHERE idProjeto = " + idProjeto + ";";
			System.out.println("Query:");
			System.out.println(query);
			banco.update(query);
		}
		
		banco.closeConnection();
	}
	
	public void putTimeProfissional(Time t) {
		Time velho = new Time();
		velho.setIdTime(t.getIdTime());
		
		getTimeProfissional(velho);
		
		ArrayList<Profissional> listaInserir = new ArrayList<>();
		
		for (Profissional p : t.getListaProfissional()) {
			if(velho.getListaProfissional().contains(p)) {
				velho.getListaProfissional().remove(p);
			}
			else {
				listaInserir.add(p);
			}
		}
		
		System.out.println("ListaRemover:");
		for (Profissional profissional : velho.getListaProfissional()) {
			System.out.printf("%s ", profissional.getNomeProfissional());
		}
		
		System.out.println("ListaInserir:");
		for (Profissional profissional : listaInserir) {
			System.out.printf("%s ", profissional.getNomeProfissional());
		}
		
		
		Time inserir = new Time();
		inserir.setIdTime(t.getIdTime());
		inserir.setListaProfissional(listaInserir);
		postTimeProfissional(inserir);
		
		deleteTimeProfissional(velho);
	}
	
	public void putTime(Time t) {
		String query = "UPDATE Time SET nomeTime = '" + t.getNomeTime() + "'"
					 + " WHERE idTime = " + t.getIdTime() + ";";
		
		banco.setConnection();
		banco.update(query);
		banco.closeConnection();
		
		putTimeProfissional(t);
	}
	
	public void deleteTime(Time t) {
		String query = "DELETE FROM Time "
					 + "WHERE idTime =  " + t.getIdTime() + ";";
		
		// Deletar em profissional
		if(t.getListaProfissional() != null)
			deleteTimeProfissional(t);
		
		// Deletar em projeto
		try {
			deleteTimeProjeto(t);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		banco.setConnection();
		
		banco.delete(query);
		
		banco.closeConnection();
	}
	
}
