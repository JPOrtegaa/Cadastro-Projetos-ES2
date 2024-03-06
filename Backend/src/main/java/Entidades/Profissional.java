package Entidades;

import java.util.ArrayList;

public class Profissional {
	
	private long idProfissional;
	private String nomeProfissional;
	private String dataNascimento;
	private String generoProfissional;
	private String racaProfissional;
	private String especialidadeProfissional;
	private String enderecoProfissional;
	private ArrayList<Time> listaTime;
	
	public long getIdProfissional() {
		return idProfissional;
	}
	
	public void setIdProfissional(long idProfissional) {
		this.idProfissional = idProfissional;
	}
	
	public String getNomeProfissional() {
		return nomeProfissional;
	}
	
	public void setNomeProfissional(String nomeProfissional) {
		this.nomeProfissional = nomeProfissional;
	}
	
	public String getDataNascimento() {
		return dataNascimento;
	}
	
	public void setDataNascimento(String dataNascimento) {
		this.dataNascimento = dataNascimento;
	}
	
	public String getGeneroProfissional() {
		return generoProfissional;
	}
	
	public void setGeneroProfissional(String generoProfissional) {
		this.generoProfissional = generoProfissional;
	}
	
	public String getRacaProfissional() {
		return racaProfissional;
	}
	
	public void setRacaProfissional(String racaProfissional) {
		this.racaProfissional = racaProfissional;
	}
	
	public String getEspecialidadeProfissional() {
		return especialidadeProfissional;
	}
	
	public void setEspecialidadeProfissional(String especialidadeProfissional) {
		this.especialidadeProfissional = especialidadeProfissional;
	}
	
	public String getEnderecoProfissional() {
		return enderecoProfissional;
	}
	
	public void setEnderecoProfissional(String enderecoProfissional) {
		this.enderecoProfissional = enderecoProfissional;
	}

	public ArrayList<Time> getListaTimes() {
		return listaTime;
	}

	public void setListaTimes(ArrayList<Time> listaTimes) {
		this.listaTime = listaTimes;
	}

}
