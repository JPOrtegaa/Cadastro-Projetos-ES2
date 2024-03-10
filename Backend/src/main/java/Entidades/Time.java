package Entidades;

import java.util.ArrayList;

public class Time {

	private long idTime;
	private String nomeTime;
	private ArrayList<Profissional> listaProfissional;
	/*
	public Time() {
		idTime = -1;
		nomeTime = null;
		listaProfissional = null;
	}
	*/
	public long getIdTime() {
		return idTime;
	}
	
	public void setIdTime(long idTime) {
		this.idTime = idTime;
	}
	
	public String getNomeTime() {
		return nomeTime;
	}
	
	public void setNomeTime(String nomeTime) {
		this.nomeTime = nomeTime;
	}
	
	public ArrayList<Profissional> getListaProfissional() {
		return listaProfissional;
	}
	
	public void setListaProfissional(ArrayList<Profissional> listaProfissional) {
		this.listaProfissional = listaProfissional;
	}
	
}
