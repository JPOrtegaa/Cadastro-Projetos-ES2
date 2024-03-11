package Banco;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class BancoSQL {
	
	private String db = "jdbc:mysql://mysql:3306/";

	private String user;

	private String password;

	private Connection conexao;
	
	public BancoSQL(/*String user, String password, String database*/) {
		this.db += "db";
		this.user = "admin";
		this.password = "admin";
		this.conexao = null;
	}
	
	public void setConnection() {
		try {
			this.conexao = DriverManager.getConnection(this.db, this.user, this.password);
			//this.conexao.setAutoCommit(false);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public void commit() {
		try {
			this.conexao.commit();
			this.conexao.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public void closeConnection() {
		try {
			this.conexao.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public void insert(String str) {
		PreparedStatement prep;
		try {
			prep = conexao.prepareStatement(str);
			prep.execute();
			System.out.println("INSERT concluido!");
		} catch (SQLException e) {
			e.printStackTrace();
			System.err.println("Erro no INSERT!");
		}
	}
	
	public void update(String str) {
		PreparedStatement prep;
		try {
			prep = conexao.prepareStatement(str);
			prep.execute();
			System.out.println("UPDATE concluido!");
		} catch (SQLException e) {
			e.printStackTrace();
			System.err.println("Erro no UPDATE!");
		}
	}
	
	public ResultSet select(String str) {
		try {
			Statement st = conexao.createStatement();
			ResultSet rs;
			
			rs = st.executeQuery(str);
			
			return rs;
		} catch (SQLException e) {
			e.printStackTrace();
			System.err.println("Erro no SELECT!");
		}
		return null;
	}
	
	public void delete(String str) {
		PreparedStatement prep;
		try {
			prep = conexao.prepareStatement(str);
			prep.execute();
			System.out.println("DELETE concluido!");
		} catch (SQLException e) {
			e.printStackTrace();
			System.err.println("Erro no DELETE!");
		}
	}
	
}
