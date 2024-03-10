package Entidades;

import java.util.ArrayList;

public class Profissional {
	
	private long idProfissional;
	private String nomeProfissional;
	private String dataNascimento;
	
	private Genero generoProfissional;
	private Raca racaProfissional;
	
	private String especialidadeProfissional;
	private String enderecoProfissional;
	private ArrayList<Time> listaTime;
	
	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Profissional outro = (Profissional) o;
        return idProfissional == outro.idProfissional;
    }
	
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
	
	public Genero getGeneroProfissional() {
		return generoProfissional;
	}

	public void setGeneroProfissional(Genero generoProfissional) {
		this.generoProfissional = generoProfissional;
	}

	public Raca getRacaProfissional() {
		return racaProfissional;
	}

	public void setRacaProfissional(Raca racaProfissional) {
		this.racaProfissional = racaProfissional;
	}
	*/
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

	public ArrayList<Time> getListaTime() {
		return listaTime;
	}

	public void setListaTime(ArrayList<Time> listaTimes) {
		this.listaTime = listaTimes;
	}

}
