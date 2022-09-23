module.exports.addOrUpdateNotes = async (req, res) => {
    const {value, exam_id, student_id, class_id, subject_id} = req.body;
	
    req.connection.query('SELECT is_editable, year_school FROM settings WHERE school_id = ?', [req.payload.school_id], (err, settings) => {
		const {is_editable, year_school} = settings[0];
		if (err) {
			console.log(err);			
		} else {
			if (is_editable === 'yes') {
				if ( value && exam_id && student_id && class_id && subject_id) {
					req.connection.query('SELECT * FROM subjects WHERE id = ?', [subject_id], (err2, subjects) => {
						const {over} = subjects[0];
						if (value <= over) {
							req.connection.query('SELECT * FROM notes WHERE student_id = ? AND class_id = ? AND subject_id = ? AND exam_id = ? AND school_year = ?', [student_id, class_id, subject_id, exam_id, year_school], (err3, notes) => {
								if (err3) {
									console.log(err3);								
								} else {
									if (notes.length < 1) {
										req.connection.query('INSERT INTO notes(student_id, exam_id, class_id, subject_id, school_year, value) VALUES(?, ?, ?, ?, ?, ?)', [student_id, exam_id, class_id, subject_id, year_school, value], (err2, resp2) => {
											if(!err2){

												req.connection.query('SELECT * FROM notes WHERE exam_id = ? AND student_id = ? AND class_id = ?', [exam_id, student_id, class_id], (err3, notes) => {
													let totalPoints = 0;
													notes.forEach(note => {
														totalPoints += parseFloat(note.value)
													})
													req.connection.query('SELECT * FROM stats WHERE student_id = ? AND exam_id = ? AND class_id = ?', [student_id, exam_id, class_id], (err, stats) => {
														if(stats.length < 1) {
															req.connection.query('INSERT INTO stats(student_id, class_id, exam_id, totalPoints) VALUES(?, ?, ?, ?)', [student_id, class_id, exam_id, totalPoints], (err5, resp5) => {
																if(err5) console.log(err5);
																else res.status(201).json({success: true})
															})
														}else{
															req.connection.query('UPDATE stats SET totalPoints = ? WHERE student_id = ? AND class_id = ? AND exam_id = ? AND school_year = ?', [totalPoints, student_id, class_id, exam_id, req.school_year], (err5, resp5) => {
																if(err5) console.log(err5);
																else res.status(201).json({success: true})
															})
														}
													})
												})
											}
											else console.log(err2);
										})
										}else{
										req.connection.query('UPDATE notes SET value = ? WHERE exam_id = ? AND student_id = ? AND subject_id = ? AND school_year = ?', [value, exam_id, student_id, subject_id, year_school], (err2, resp) => {
											if(!err2){

												req.connection.query('SELECT * FROM notes WHERE exam_id = ? AND student_id = ? AND class_id = ?', [exam_id, student_id, class_id], (err3, notes) => {
													let totalPoints = 0;
													notes.forEach(note => {
														totalPoints += parseFloat(note.value)
													})
													req.connection.query('SELECT * FROM stats WHERE student_id = ? AND exam_id = ? AND class_id = ?', [student_id, exam_id, class_id], (err, stats) => {
														if(stats.length < 1) {
															req.connection.query('INSERT INTO stats(student_id, class_id, exam_id, totalPoints, school_year) VALUES(?, ?, ?, ?, ?)', [student_id, class_id, exam_id, totalPoints, year_school], (err5, resp5) => {
																if(err5) console.log(err5);
																else res.status(201).json({success: true})
															})
														}else{
															req.connection.query('UPDATE stats SET totalPoints = ? WHERE student_id = ? AND class_id = ? AND exam_id = ? AND school_year = ?', [totalPoints, student_id, class_id, exam_id, year_school], (err5, resp5) => {
																if(err5) console.log(err5);
																else res.status(201).json({success: true})
															})
														}
													})
												})
											}
											else console.log(err);
										})
										}
								}
							})
						} else {
							res.status(401).json({success: false, message: `Valeur superieur au max (${over})`})
						}
					})
				}else{
					res.status(401).json({success: false, message: "Au moins un champ manquant!!"})
				}
			} else {
				res.status(401).json({success: false, message: "Ce n'est pas encore le moment d'editer les notes!!! Patientez svp!!"})
			}
		}
	})
}
module.exports.addOrUpdateNotes2 = async (req, res) => {
    const {value, exam_id, student_id, subject_type, class_id, subject_id} = req.body;
	
    req.connection.query('SELECT is_editable, year_school FROM settings WHERE school_id = ?', [req.payload.school_id], (err, settings) => {
		const {is_editable, year_school} = settings[0];
		if (err) {
			console.log(err);			
		} else {
			if (is_editable === 'yes') {
				if ( value && exam_id && student_id && class_id && subject_id) {
					req.connection.query('SELECT * FROM subjects WHERE id = ?', [subject_id], (err2, subjects) => {
						const {over} = subjects[0];
						if (value <= over) {
							req.connection.query('SELECT * FROM notes_primary WHERE student_id = ? AND class_id = ? AND subject_id = ? AND subject_type = ? AND exam_id = ? AND school_year = ?', [student_id, class_id, subject_id, subject_type, exam_id, year_school], (err3, notes) => {
								if (err3) {
									console.log(err3);								
								} else {
									if (notes.length < 1) {
										req.connection.query('INSERT INTO notes_primary(student_id, exam_id, class_id, subject_id, subject_type, school_year, value) VALUES(?, ?, ?, ?, ?, ?, ?)', [student_id, exam_id, class_id, subject_id, subject_type, year_school, value], (err2, resp2) => {
											if(!err2){

												req.connection.query('SELECT * FROM notes_primary WHERE exam_id = ? AND student_id = ? AND class_id = ?', [exam_id, student_id, class_id], (err3, notes) => {
													let totalPoints = 0;
													notes.forEach(note => {
														totalPoints += parseFloat(note.value)
													})
													req.connection.query('SELECT * FROM stats WHERE student_id = ? AND exam_id = ? AND class_id = ?', [student_id, exam_id, class_id], (err, stats) => {
														if(stats.length < 1) {
															req.connection.query('INSERT INTO stats(student_id, class_id, exam_id, totalPoints) VALUES(?, ?, ?, ?)', [student_id, class_id, exam_id, totalPoints], (err5, resp5) => {
																if(err5) console.log(err5);
																else res.status(201).json({success: true})
															})
														}else{
															req.connection.query('UPDATE stats SET totalPoints = ? WHERE student_id = ? AND class_id = ? AND exam_id = ? AND school_year = ?', [totalPoints, student_id, class_id, exam_id, req.school_year], (err5, resp5) => {
																if(err5) console.log(err5);
																else res.status(201).json({success: true})
															})
														}
													})
												})
											}
											else console.log(err2);
										})
										}else{
										req.connection.query('UPDATE notes_primary SET value = ? WHERE exam_id = ? AND student_id = ? AND subject_id = ? AND subject_type = ? AND school_year = ?', [value, exam_id, student_id, subject_id, subject_type, year_school], (err2, resp) => {
											if(!err2){

												req.connection.query('SELECT * FROM notes_primary WHERE exam_id = ? AND student_id = ? AND class_id = ?', [exam_id, student_id, class_id], (err3, notes) => {
													let totalPoints = 0;
													notes.forEach(note => {
														totalPoints += parseFloat(note.value)
													})
													req.connection.query('SELECT * FROM stats WHERE student_id = ? AND exam_id = ? AND class_id = ?', [student_id, exam_id, class_id], (err, stats) => {
														if(stats.length < 1) {
															req.connection.query('INSERT INTO stats(student_id, class_id, exam_id, totalPoints, school_year) VALUES(?, ?, ?, ?, ?)', [student_id, class_id, exam_id, totalPoints, year_school], (err5, resp5) => {
																if(err5) console.log(err5);
																else res.status(201).json({success: true})
															})
														}else{
															req.connection.query('UPDATE stats SET totalPoints = ? WHERE student_id = ? AND class_id = ? AND exam_id = ? AND school_year = ?', [totalPoints, student_id, class_id, exam_id, year_school], (err5, resp5) => {
																if(err5) console.log(err5);
																else res.status(201).json({success: true})
															})
														}
													})
												})
											}
											else console.log(err);
										})
										}
								}
							})
						} else {
							res.status(401).json({success: false, message: `Valeur superieur au max (${over})`})
						}
					})
				}else{
					res.status(401).json({success: false, message: "Au moins un champ manquant!!"})
				}
			} else {
				res.status(401).json({success: false, message: "Ce n'est pas encore le moment d'editer les notes!!! Patientez svp!!"})
			}
		}
	})
}

module.exports.getNotes = async (req, res) => {
	req.connection.query('SELECT * FROM notes WHERE class_id = ? AND exam_id = ? AND school_year = ?', 
							[req.params.class_id, req.params.exam_id, req.school_year], (err, resp) => {
		if(err) console.log(err);
		else res.status(201).json(resp)			
	})
}

module.exports.getNotes2 = async (req, res) => {
	req.connection.query('SELECT * FROM notes_primary WHERE class_id = ? AND exam_id = ? AND school_year = ?', 
						[req.params.class_id, req.params.exam_id, req.school_year], (err, resp) => {
		if(err) console.log(err);
		else res.status(201).json(resp)			
	})
}

module.exports.getNotesClasses = async (req, res) => {
	req.connection.query('SELECT * FROM notes WHERE class_id = ? AND school_year = ?', 
							[req.params.class_id, req.school_year], (err, resp) => {
		if(err) console.log(err);
		else res.status(201).json(resp)			
	})
}

module.exports.getNotesClasses2 = async (req, res) => {
	req.connection.query('SELECT * FROM notes_primary WHERE class_id = ? AND school_year = ?', 
							[req.params.class_id, req.school_year], (err, resp) => {
		if(err) console.log(err);
		else res.status(201).json(resp)			
	})
}

module.exports.getTotalPoints = (req, res) => {
	const {exam_id, class_id} = req.params;
	
	req.connection.query('SELECT * FROM stats WHERE class_id = ? AND exam_id = ? AND school_year =  ?', [class_id, exam_id, req.school_year], (err, resp) => {
		if(err) console.log(err);
		else {
			let rangedArray = [];
			let firstPoints = 0;
			let lastPoints = {};
			let gAr = [];
			let g = [];
			let ids = [];
			if (resp.length > 1) {
				rangedArray = resp.sort((a, b) => b.totalPoints - a.totalPoints);
				g = resp.sort((a, b) => b.totalPoints - a.totalPoints);
				rangedArray.forEach(r => {
					if (!ids.includes(r.student_id)) {
						ids.push(r.student_id);
						gAr.push(r);
					}
				})
				firstPoints = g[0].totalPoints;
				lastPoints = {};
				g.forEach(ey => {
					lastPoints = ey.totalPoints;
				})
			}
			
			res.status(201).json({first: firstPoints, last: lastPoints, arr: gAr});
		}
	})
}

module.exports.addOrUpdateStats = (req, res) => {
	const {student_id, exam_id, class_id} = req.body;
	req.connection.query('SELECT seqIds FROM trims WHERE id = ?', [exam_id], (err, resp) => {
		if(err) console.log(err);
		else{
			 const {seqIds} = resp[0]
			 const seqs = JSON.parse(seqIds);
			 const fEvalId = seqs[0];
			 const sEvalId = seqs[1];
			 req.connection.query('SELECT * FROM notes WHERE exam_id = ? AND student_id = ?', [fEvalId, student_id], (e, fEvalNotes) => {
				 if(e) console.log(e);
				 req.connection.query("SELECT * FROM notes WHERE exam_id = ? AND student_id = ?", [sEvalId, student_id], (e2, sEvalNOtes) => {
					if(e2) console.log(e2);
					let ar = [];
					fEvalNotes.forEach(n1 => {
						sEvalNOtes.forEach(n2 => {
							if (n1.matiere_id === n2.matiere_id && n1.tag_name === n2.tag_name && n1.student_id === n2.student_id) {
								let v = Math.round((parseFloat(n1.value) + parseFloat(n2.value)) / 2).toString();
								let obj : {
									student_id: string,
									class_id: string,
									matiere_id: string,
									tag_name: string,
									value: string,
								} = {
									student_id: '',
									class_id: '',
									matiere_id: '',
									tag_name: '',
									value: '',
								};
								obj.student_id = n1.student_id;
								obj.class_id = n1.class_id;
								obj.matiere_id = n1.matiere_id;
								obj.tag_name = n1.tag_name;
								obj.value = v;
								ar.push(obj)
							}
						})

					})

					let totalPoints = 0;

					ar.forEach(note => {
						totalPoints += parseFloat(note.value);
					})
					req.connection.query('SELECT * FROM stats WHERE student_id = ? AND exam_id = ? AND class_id = ?', [student_id, exam_id, class_id], (err, stats) => {
						if(stats.length < 1) {
							req.connection.query('INSERT INTO stats(student_id, class_id, exam_id, totalPoints, school_year) VALUES(?, ?, ?, ?, ?)', [student_id, class_id, exam_id, totalPoints, req.school_year], (err5, resp5) => {
								if(err5) console.log(err5);
								else res.status(201).json({success: true})
							})
						}else{
							req.connection.query('UPDATE stats SET totalPoints = ? WHERE student_id = ? AND class_id = ? AND exam_id = ? AND school_year = ?', [totalPoints, student_id, class_id, exam_id, req.school_year], (err5, resp5) => {
								if(err5) console.log(err5);
								else res.status(201).json({success: true})
							})
						}
					})
					
				 })
			 })
		}
	})
}

module.exports.calAnnualNotes = (req, res) => {
	const {exam_id, class_id} = req.body;
	req.connection.query('SELECT * FROM students WHERE class_id = ?', [class_id], (err, students) => {
		if (err) console.log(err);
		else{
			students.forEach(student => {
				req.connection.query('SELECT * FROM trims', [], (err2, trims) => {
					if (err) console.log(err);
					else {
						if (trims.length === 3) {							
							req.connection.query(`SELECT * FROM notes WHERE class_id = ? AND student_id = ? AND exam_id = ? AND school_year = ?`, 
									[class_id, student.id, trims[0].id, req.school_year], (err, first_trim_notes) => {
								if(err) console.log(err);
								else {
									req.connection.query(`SELECT * FROM notes WHERE class_id = ? AND student_id = ? AND exam_id = ? AND school_year = ?`, 
											[class_id, student.id, trims[1].id, req.school_year], (err, second_trim_notes) => {
										if(err) console.log(err);
										else {
											req.connection.query(`SELECT * FROM notes WHERE class_id = ? AND student_id = ? AND exam_id = ? AND school_year = ?`, 
													[class_id, student.id, trims[2].id, req.school_year], (err, third_trim_notes) => {
												if(err) console.log(err);
												else {
													first_trim_notes.forEach(n1 => {
														second_trim_notes.forEach(n2 => {
															third_trim_notes.forEach(n3 => {
																if (  
																		n1.subject_id === n2.subject_id
																		&& n1.class_id === n2.class_id 
																		&& n1.student_id === n2.student_id
																		&& n3.subject_id === n2.subject_id
																		&& n3.class_id === n2.class_id 
																		&& n3.student_id === n2.student_id 
																		&& n3.subject_id === n1.subject_id
																		&& n3.class_id === n1.class_id 
																		&& n3.student_id === n1.student_id
																	) {
																	let v : string = Math.round(
																		(parseFloat(n1.value) + parseFloat(n2.value) + parseFloat(n3.value)
																	) / 3).toString();
																	
																	req.connection.query('SELECT is_editable, year_school FROM settings WHERE school_id = ?', [req.payload.school_id], (err, settings) => {
																		const {year_school} = settings[0];
																		req.connection.query('SELECT * FROM notes WHERE student_id = ? AND class_id = ? AND subject_id = ? AND exam_id = ? AND school_year = ?', [student.id, class_id, n1.subject_id, exam_id, year_school], (err3, notes) => {
																			if (err3) {
																				console.log(err3);								
																			} else {
																				if (notes.length < 1) {
																					req.connection.query('INSERT INTO notes(student_id, exam_id, class_id, subject_id, school_year, value) VALUES(?, ?, ?, ?, ?, ?)', [student.id, exam_id, class_id, n1.subject_id, year_school, v], (err2, resp2) => {
																						if(!err2){
							
																							req.connection.query('SELECT * FROM notes WHERE exam_id = ? AND student_id = ? AND class_id = ?', [exam_id, student.id, class_id], (err3, notes) => {
																								let totalPoints = 0;
																								notes.forEach(note => {
																									totalPoints += parseFloat(note.value)
																								})
																								req.connection.query('SELECT * FROM stats WHERE student_id = ? AND exam_id = ? AND class_id = ?', [student.id, exam_id, class_id], (err, stats) => {
																									if(stats.length < 1) {
																										req.connection.query('INSERT INTO stats(student_id, class_id, exam_id, totalPoints, school_year) VALUES(?, ?, ?, ?, ?)', [student.id, class_id, exam_id, totalPoints, year_school], (err5, resp5) => {
																											if(err5) console.log(err5);
																										})
																									}else{
																										req.connection.query('UPDATE stats SET totalPoints = ? WHERE student_id = ? AND class_id = ? AND exam_id = ? AND school_year = ?', [totalPoints, student.id, class_id, exam_id, year_school], (err5, resp5) => {
																											if(err5) console.log(err5);
																										})
																									}
																								})
																							})
																						}
																						else console.log(err2);
																					})
																				}else{
																					req.connection.query('UPDATE notes SET value = ? WHERE exam_id = ? AND student_id = ? AND subject_id = ? AND subject_type = ? AND school_year = ?', [v, exam_id, student.id, n1.subject_id, n1.subject_type, year_school], (err2, resp) => {
																						if(!err2){
							
																							req.connection.query('SELECT * FROM notes WHERE exam_id = ? AND student_id = ? AND class_id = ?', [exam_id, student.id, class_id], (err3, notes) => {
																								let totalPoints = 0;
																								notes.forEach(note => {
																									totalPoints += parseFloat(note.value)
																								})
																								req.connection.query('SELECT * FROM stats WHERE student_id = ? AND exam_id = ? AND class_id = ?', [student.id, exam_id, class_id], (err, stats) => {
																									if(stats.length < 1) {
																										req.connection.query('INSERT INTO stats(student_id, class_id, exam_id, totalPoints) VALUES(?, ?, ?, ?)', [student.id, class_id, exam_id, totalPoints], (err5, resp5) => {
																											if(err5) console.log(err5);
																										})
																									}else{
																										req.connection.query('UPDATE stats SET totalPoints = ? WHERE student_id = ? AND class_id = ? AND exam_id = ?', [totalPoints, student.id, class_id, exam_id], (err5, resp5) => {
																											if(err5) console.log(err5);
																										})
																									}
																								})
																							})
																						}
																						else console.log(err);
																					})
																				}
																			}
																		})
																	})
																}
															});
														});
													});
												}		
											});
										}		
									});
								}		
							})
						} else {
							res.status(401).json({success: false, message: 'Il doit avoir 3 trimestres pour commencer veuillez en ajouter ou diminuer!!'})
						}	
					}
				})
			})
		}
		// res.status(201).json({success: true})
	})
}

module.exports.calAnnualNotes2 = (req, res) => {
	const {exam_id, class_id} = req.body;
	req.connection.query('SELECT * FROM students WHERE class_id = ?', [class_id], (err, students) => {
		if (err) console.log(err);
		else{
			students.forEach(student => {
				req.connection.query('SELECT * FROM trims', [], (err2, trims) => {
					if (err) console.log(err);
					else {
						if (trims.length === 3) {							
							req.connection.query(`SELECT * FROM notes_primary WHERE class_id = ? AND student_id = ? AND exam_id = ? AND school_year = ?`, 
									[class_id, student.id, trims[0].id, req.school_year], (err, first_trim_notes) => {
								if(err) console.log(err);
								else {
									req.connection.query(`SELECT * FROM notes_primary WHERE class_id = ? AND student_id = ? AND exam_id = ? AND school_year = ?`, 
											[class_id, student.id, trims[1].id, req.school_year], (err, second_trim_notes) => {
										if(err) console.log(err);
										else {
											req.connection.query(`SELECT * FROM notes_primary WHERE class_id = ? AND student_id = ? AND exam_id = ? AND school_year = ?`, 
													[class_id, student.id, trims[2].id, req.school_year], (err, third_trim_notes) => {
												if(err) console.log(err);
												else {
													first_trim_notes.forEach(n1 => {
														second_trim_notes.forEach(n2 => {
															third_trim_notes.forEach(n3 => {
																if (  
																		n1.subject_id === n2.subject_id
																		&& n1.class_id === n2.class_id 
																		&& n1.student_id === n2.student_id
																		&& n1.subject_type === n2.subject_type
																		&& n3.subject_id === n2.subject_id
																		&& n3.class_id === n2.class_id 
																		&& n3.student_id === n2.student_id
																		&& n3.subject_type === n2.subject_type ) {
																	let v : string = Math.round(
																		(parseFloat(n1.value) + parseFloat(n2.value) + parseFloat(n3.value)
																	) / 3).toString();
																	
																	req.connection.query('SELECT is_editable, year_school FROM settings WHERE school_id = ?', [req.payload.school_id], (err, settings) => {
																		const {year_school} = settings[0];
																		req.connection.query(`SELECT * FROM notes_primary WHERE student_id = ? AND class_id = ? AND subject_id = ? 
																								AND subject_type = ? AND exam_id = ? AND school_year = ?`, 
																								[student.id, class_id, n1.subject_id, n1.subject_type, exam_id, year_school], 
																			(err3, notes) => {
																			if (err3) {
																				console.log(err3);								
																			} else {
																				if (notes.length < 1) {
																					req.connection.query(`INSERT INTO notes_primary(student_id, exam_id, class_id, subject_id, subject_type, 
																											school_year, value) 
																											VALUES(?, ?, ?, ?, ?, ?, ?)`, 
																											[student.id, exam_id, class_id, 
																												n1.subject_id, n1.subject_type, 
																												year_school, v], (err2, resp2) => {
																						if(!err2){
							
																							req.connection.query('SELECT * FROM notes_primary WHERE exam_id = ? AND student_id = ? AND class_id = ?', [exam_id, student.id, class_id], (err3, notes) => {
																								let totalPoints = 0;
																								notes.forEach(note => {
																									totalPoints += parseFloat(note.value)
																								})
																								req.connection.query('SELECT * FROM stats WHERE student_id = ? AND exam_id = ? AND class_id = ?', [student.id, exam_id, class_id], (err, stats) => {
																									if(stats.length < 1) {
																										req.connection.query('INSERT INTO stats(student_id, class_id, exam_id, totalPoints, school_year) VALUES(?, ?, ?, ?, ?)', [student.id, class_id, exam_id, totalPoints, year_school], (err5, resp5) => {
																											if(err5) console.log(err5);
																										})
																									}else{
																										req.connection.query('UPDATE stats SET totalPoints = ? WHERE student_id = ? AND class_id = ? AND exam_id = ? AND school_year = ?', [totalPoints, student.id, class_id, exam_id, year_school], (err5, resp5) => {
																											if(err5) console.log(err5);
																										})
																									}
																								})
																							})
																						}
																						else console.log(err2);
																					})
																					}else{
																					req.connection.query('UPDATE notes_primary SET value = ? WHERE exam_id = ? AND student_id = ? AND subject_id = ? AND school_year = ?', [v, exam_id, student.id, n1.subject_id, year_school], (err2, resp) => {
																						if(!err2){
							
																							req.connection.query('SELECT * FROM notes_primary WHERE exam_id = ? AND student_id = ? AND class_id = ?', [exam_id, student.id, class_id], (err3, notes) => {
																								let totalPoints = 0;
																								notes.forEach(note => {
																									totalPoints += parseFloat(note.value)
																								})
																								req.connection.query('SELECT * FROM stats WHERE student_id = ? AND exam_id = ? AND class_id = ?', [student.id, exam_id, class_id], (err, stats) => {
																									if(stats.length < 1) {
																										req.connection.query('INSERT INTO stats(student_id, class_id, exam_id, totalPoints) VALUES(?, ?, ?, ?)', [student.id, class_id, exam_id, totalPoints], (err5, resp5) => {
																											if(err5) console.log(err5);
																										})
																									}else{
																										req.connection.query('UPDATE stats SET totalPoints = ? WHERE student_id = ? AND class_id = ? AND exam_id = ?', [totalPoints, student.id, class_id, exam_id], (err5, resp5) => {
																											if(err5) console.log(err5);
																										})
																									}
																								})
																							})
																						}
																						else console.log(err);
																					})
																				}
																			}
																		})
																	})
																}
															});
														});
													});
												}		
											});
										}		
									});
								}		
							})
						} else {
							res.status(401).json({success: false, message: 'Il doit avoir 3 trimestres pour commencer veuillez en ajouter ou diminuer!!'})
						}	
					}
				})
			})
		}
		// res.status(201).json({success: true})
	})
}