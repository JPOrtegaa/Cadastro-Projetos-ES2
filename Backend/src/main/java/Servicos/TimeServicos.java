package Servicos;

import java.util.ArrayList;

import DAO.TimeDao;
import Entidades.Time;

public class TimeServicos {
	
	private TimeDao daoTime;
	
	public TimeServicos() {
		daoTime = new TimeDao();
	}
	
	public void inserirTime(Time t) {
		
		daoTime.postTime(t);
		
		
	}
	
	public Time obterTimeByID(long id) {
		Time t = new Time();
		t.setIdTime(id);
		
		t = daoTime.getTimeByID(t);
		
		return t;
	}
	
	public ArrayList<Time> obterListaTimes(){
		return daoTime.getTodosTimes();
	}
	
	public void atualizarTime(Time t) {
		daoTime.putTime(t);
	}
	
	public void deletarTime(Time t) {
		daoTime.deleteTime(t);
	}
	
}
