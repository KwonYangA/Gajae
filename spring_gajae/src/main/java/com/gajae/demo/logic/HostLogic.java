package com.gajae.demo.logic;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gajae.demo.dao.HostDAO;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
public class HostLogic {

	@Autowired
	private HostDAO hostDAO;

	public int hostSignup(Map<String, Object> map) {

		int result = hostDAO.hostSignup(map);

		return result;

	}

	public List<Map<String, Object>> overlapCheck(Map<String, Object> map) {
		log.info("map = {}", map);
		List<Map<String, Object>> hostList = hostDAO.overlapCheck(map);
		return hostList;

	}

	public List<Map<String, Object>> login(Map<String, Object> map) {
		log.info("map = {}", map);
		List<Map<String, Object>> hostList = hostDAO.login(map);

		return hostList;
	}

	// 호텔등록 로직
	public int propertyInsert(Map<String, Object> map) {
		log.info("map={}", map);
		log.info(map.get("room_id"));

		// Object pids[] = map.keySet().toArray();

		ArrayList<String> arrayList = (ArrayList<String>) map.get("room_id");
		String[] roomtypes = arrayList.toArray(new String[0]);

		int[] rids = new int[roomtypes.length];
		for (String s : roomtypes) {
			log.info("s ={}", s);
		}

		for (int i = 0; i < rids.length; i++) {
			log.info(roomtypes[i]);
			rids[i] = Integer.parseInt(roomtypes[i]);
		}
		ArrayList<Map<String, Object>> list = new ArrayList<>();

		Map<String, Object> pMap = null;
		int p_id = hostDAO.getPid();

		if (p_id <= 0) {
			return -1;
		}
		// p_id에 해당하는 달력테이블 생성
	/*	vacancyCreate(p_id);

		// p_id room_id받아와서 달력insert
		ArrayList<Map<String, Object>> vacancyList = new ArrayList<>();
		Map<String, Object> vacancyMap = null;
		for (int i = 0; i < rids.length; i++) {
			vacancyMap = new HashMap<>();
			vacancyMap.put("p_id", p_id);
			vacancyMap.put("ROOM_ID", rids[i]);
			log.info(rids[i]);
			vacancyList.add(vacancyMap);
		}
		log.info("vacancyList={}", vacancyList);

		vacancyInsert(vacancyList);*/

		for (int i = 0; i < rids.length; i++) {
			pMap = new HashMap<>();
			pMap.put("p_id", p_id);
			pMap.put("r_id", rids[i]);
			pMap.put("p_title", map.get("p_title"));
			pMap.put("p_overview", map.get("p_overview"));
			pMap.put("p_tel", map.get("p_tel"));
			pMap.put("p_postal", map.get("p_postal"));
			pMap.put("p_address", map.get("p_address"));
			pMap.put("p_refund", map.get("p_refund"));
			pMap.put("p_scale", map.get("p_scale"));
			pMap.put("p_checkin", map.get("p_checkin"));
			pMap.put("p_checkout", map.get("p_checkout"));
			pMap.put("p_star", map.get("p_star"));
			pMap.put("p_photo", map.get("p_photo"));
			pMap.put("host_business_num", map.get("host_business_num"));
			pMap.put("p_mapx", map.get("p_mapx"));
			pMap.put("p_mapy", map.get("p_mapy"));
			log.info(rids[i]);
			// log.info("before : ", map);
			// map.put("r_id", rids[i]);
			// log.info("after : ", map);
			list.add(pMap);
		}
		log.info("rList={}", list);

		int result = hostDAO.propertyInsert(list);

		log.info("result={}", result + "건 등록되었습니다.");

		return p_id;
	}

	// 달력생성
	private int vacancyCreate(int p_id) {
		log.info("p_id={}", p_id);

		int result = hostDAO.vacancyCreate(p_id);

		return result;
	}

	// 달력생성 -> 호텔 등록 성공시에 P_ID,roomIds 받아서 달력이 생성되어야함
	private int vacancyInsert(List<Map<String, Object>> vacancyList) {
		log.info("vacancyList = {}", vacancyList);

		int result = hostDAO.vacancyInsert(vacancyList);

		return result;
	}

	// 룸타입 등록
	private List<Map<String, Object>> roomList(Map<String, Object> map) {
		log.info("room_id = {}", map.get("room_id"));
		// List타입의 rList변수 생성
		List<Map<String, Object>> rList = new ArrayList<>();

		// room_id 키에 저장된 값을 String[]타입으로 캐스팅하고 이 배열을 roomType변수에 저장한다.
		// String[] roomtypes = (String[]) map.get("room_id");
		ArrayList<String> arrayList = (ArrayList<String>) map.get("room_id");
		String[] roomtypes = arrayList.toArray(new String[0]);

		HashMap<String, Object> roomIdList = null;
		// roomtype배열에 저장된 각각의 문자열에 대해 반복적으로 실행.
		// 내부에서는 HashMap<String, Object>타입의 변수 rMap을 새로 생성하고 현재 문자열을 저장하고
		// rMap을 rList에 저장한다.
		for (int i = 0; i < roomtypes.length; i++) {
			roomIdList = new HashMap<String, Object>();
			roomIdList.put("room_id", roomtypes[i]);
			roomIdList.put("p_id", map.get("p_id"));
			rList.add(roomIdList);
		}
		log.info("rList={}", rList);
		return rList;
	}

	public int hostfacInsert(Map<String, Object> map) {
		int result = 0;
		result = hostDAO.hostfacInsert(map);
		return result;
	}

	public int hostextraInsert(Map<String, Object> map) {
		log.info("map={}", map);
		int result = 0;
		// ArrayList<String> arrayList = (ArrayList<String>) map.get("P_EXTRA");
		// String[] extratypes = new String[] { (String) map.get("P_EXTRA") };
		String[] extratypes = ((String) map.get("P_EXTRA")).split(",");
		log.info("P_EXTRA={}", extratypes);

		ArrayList<Map<String, Object>> list = new ArrayList<>();
		Map<String, Object> pMap = null;
		for (int i = 0; i < extratypes.length; i++) {
			pMap = new HashMap<>();
			pMap.put("P_ID", map.get("P_ID"));
			pMap.put("P_EXTRA_SEQ", String.valueOf(i + 1));
			pMap.put("P_EXTRA", extratypes[i].trim());
			log.info(extratypes[i]);
			list.add(pMap);
		}
		log.info("rList={}", list);
		result = hostDAO.hostextraInsert(list);
		return result;
	}

	public List<Map<String, Object>> hotelList(Map<String, Object> map) {
		log.info("map = {}", map);
		List<Map<String, Object>> result = hostDAO.hotelList(map);
		log.info("result = {}", result);
		return result;
	}

	public List<Map<String, Object>> hotelDetail(Map<String, Object> map) {
		log.info("map = {}", map);
		List<Map<String, Object>> result = hostDAO.hotelDetail(map);
		log.info("result = {}", result);
		return result;
	}

	// 룸타입 업데이트처리

	public int hotelUpdate(Map<String, Object> map) {
		log.info("map = {}", map);
		int result = hostDAO.hotelUpdate(map);
		return result;
	}

	public Map<String, Object> facPidExist(Map<String, Object> map) {
		Map<String, Object> result = hostDAO.facPidExist(map);

		return result;
	}

	public int hotelDelete(Map<String, Object> map) {
		int result = hostDAO.hotelDelete(map);

		return result;
	}

}
