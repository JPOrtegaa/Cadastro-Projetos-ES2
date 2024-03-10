package DAO;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import Banco.BancoSQL;
import Entidades.Projeto;
import Entidades.Time;

public class ProjetoDao {
	
	private BancoSQL banco;
	private TimeDao daoTime;
	
	public ProjetoDao() {
		this.banco = new BancoSQL("root", "jp17", "es2-projeto1-final");
		this.daoTime = new TimeDao();
	}
	
	public void postProjeto(Projeto p) {
		String query = "INSERT INTO Projeto (nomeProjeto, nomeCliente, objetivoProjeto, dataInicio, "
					 + "dataTermino, valorProjeto, Time_idTime) "
					 + "VALUES ('" + p.getNomeProjeto() + "', "
					 + "'" + p.getNomeCliente() + "', "
					 + "'" + p.getObjetivoProjeto() + "', "
					 + "'" + p.getDataInicio() + "', "
					 + "'" + p.getDataTermino() + "', "
					 + "'" + p.getValorProjeto() + "', "
					 + p.getTime().getIdTime() + ");";
		
		banco.setConnection();
		banco.insert(query);
		banco.closeConnection();
	}
	
	public Projeto getProjetoByID(Projeto p) {
		String query = "SELECT * FROM Projeto WHERE idProjeto = " + p.getIdProjeto() + ";";
		Projeto projeto = null;
		Time t = null;
		
		ResultSet rs;
		
		banco.setConnection();
		
		rs = banco.select(query);
		
		try {
			while(rs.next()) {
				projeto = new Projeto();
				t = new Time();
				t.setIdTime(rs.getLong(8));
				
				projeto.setIdProjeto(rs.getLong(1));
				projeto.setNomeProjeto(rs.getString(2));
				projeto.setNomeCliente(rs.getString(3));
				projeto.setObjetivoProjeto(rs.getString(4));
				projeto.setDataInicio(rs.getDate(5).toString());
				projeto.setDataTermino(rs.getDate(6).toString());
				projeto.setValorProjeto(rs.getFloat(7));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		banco.closeConnection();
		
		if(t != null) {			
			t = daoTime.getTimeByID(t);
			projeto.setTime(t);
		}
		
		return projeto;
	}
	
	public ArrayList<Projeto> getListaProjetos(){
		String query = "SELECT * FROM Projeto";
		ArrayList<Projeto> listaProjeto = new ArrayList<>();
		ResultSet rs;
		
		banco.setConnection();
		rs = banco.select(query);
		
		try {
			while(rs.next()) {
				Projeto p = new Projeto();
				Time t = new Time();
				t.setIdTime(rs.getLong(8));
				t = daoTime.getTimeByID(t);
				
				p.setIdProjeto(rs.getLong(1));
				p.setNomeProjeto(rs.getString(2));
				p.setNomeCliente(rs.getString(3));
				p.setObjetivoProjeto(rs.getString(4));
				p.setDataInicio(rs.getDate(5).toString());
				p.setDataTermino(rs.getDate(6).toString());
				p.setValorProjeto(rs.getFloat(7));
				p.setTime(t);
				
				listaProjeto.add(p);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		banco.closeConnection();
		
		return listaProjeto;
	}
	
	public void putProjeto(Projeto p) {
		String query = "UPDATE Projeto "
					 + "SET nomeProjeto = '" + p.getNomeProjeto()
					 + "', nomeCliente = '" + p.getNomeCliente()
					 + "', objetivoProjeto = '" + p.getObjetivoProjeto()
					 + "', dataInicio = '" + p.getDataInicio()
					 + "', dataTermino = '" + p.getDataTermino()
					 + "', valorProjeto = '" + p.getValorProjeto()
					 + "', Time_idTime = " + p.getTime().getIdTime()
					 + " WHERE idProjeto = " + p.getIdProjeto() + ";";
		
		banco.setConnection();
		banco.update(query);
		banco.closeConnection();
	}
	
	public void deleteProjeto(Projeto p) {
		String query = "DELETE FROM Projeto WHERE idProjeto = " + p.getIdProjeto() + ";";
		banco.setConnection();
		banco.delete(query);
		banco.closeConnection();
	}
	
}
