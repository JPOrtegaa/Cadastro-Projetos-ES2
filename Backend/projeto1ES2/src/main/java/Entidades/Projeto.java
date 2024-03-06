package Entidades;

public class Projeto {

	private long idProjeto;
	private String nomeProjeto;
	private String nomeCliente;
	private String objetivoProjeto;
	private String dataInicio;
	private String dataTermino;
	private float valorProjeto;
	private Time time;
	
	public long getIdProjeto() {
		return idProjeto;
	}
	
	public void setIdProjeto(long idProjeto) {
		this.idProjeto = idProjeto;
	}
	
	public String getNomeProjeto() {
		return nomeProjeto;
	}
	
	public void setNomeProjeto(String nomeProjeto) {
		this.nomeProjeto = nomeProjeto;
	}
	
	public String getNomeCliente() {
		return nomeCliente;
	}
	
	public void setNomeCliente(String nomeCliente) {
		this.nomeCliente = nomeCliente;
	}
	
	public String getObjetivoProjeto() {
		return objetivoProjeto;
	}
	
	public void setObjetivoProjeto(String objetivoProjeto) {
		this.objetivoProjeto = objetivoProjeto;
	}
	
	public String getDataInicio() {
		return dataInicio;
	}
	
	public void setDataInicio(String dataInicio) {
		this.dataInicio = dataInicio;
	}
	
	public String getDataTermino() {
		return dataTermino;
	}
	
	public void setDataTermino(String dataTermino) {
		this.dataTermino = dataTermino;
	}
	
	public float getValorProjeto() {
		return valorProjeto;
	}
	
	public void setValorProjeto(float valorProjeto) {
		this.valorProjeto = valorProjeto;
	}
	
	public Time getTime() {
		return time;
	}
	
	public void setTime(Time time) {
		this.time = time;
	}
	
}
