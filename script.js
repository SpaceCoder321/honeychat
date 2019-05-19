"use strict";

(function (win, doc) {
	window.onload = (function () {
		console.log("Document initialized");
		init();
		$("form").on("submit", function (ev) {
			$("#submit").html("Loading ... ");
			ev.preventDefault();
			frd = {
				n: doc.forms[0].uname.value
			}
			if (!!validiate()) {
				submitf(function (rrd) {
					if (rrd == true) {
						logged();
					} else {
						alert(rrd);
						$("#submit").html("Submit");
					}
				})
			}
		});
		try {
			document.querySelectorAll("body > div:nth-child(12)")[0].style.display = "none";
		}catch(e) {}
		$("#backlist").click(function () {
			$("#room .textmessages").hide().empty();
			$(".users").show();
			$(".backbtn").hide();
			$("#room .subtitle").hide();
			clearInterval(revent);
			$("#sendm").hide();
			$(".sendbtn").hide();
			curry = [];
			nagin();
		});
	});
})(window, document);
var el = function (x) { return document.querySelectorAll(x); }, log = function (x) { console.log(x); }, _, cusr, frd, cuid, curry, revent,
	System = {
		str: {
			trim: function (x, b) {
				return x.trim().replace(/\s+/g, b ? "" : " ");
			}
		}
	};
var lgn = function (n, p, ff) {
	ff = !ff ? function () { } : ff;
	$.post("fetch.php", {
		[_("vvhffd")]: _("gourzodhu"),
		"usern": System.str.trim(n, true),
		"userp": p,
		"query": "lgn"
	}, function (dat_, suc_) {
		ff(dat_);
	});
}
var submitf = function (dw) {
	var form = document.forms[0];
	var uname = form.uname.value;
	var upass = form.upass.value;
	if (form.getAttribute("name") != "login") {
		newuser_submit();
		return true;
	}
	lgn(uname, upass, function (d) {
		var rdt = parseInt(d.trim());
		switch (rdt) {
			case -1:
				return dw("UserName not found");
			case 0:
				return dw("Wrong Password");
			case 1:
				return dw(true);
			default:
				return dw("Error Occoured");
		}
	});
}
var isSpam = function (text) {
	var spamWords = [];
	text = text.toLowerCase();
	var spammed = false;
	for (var each_1 in spamWords) {
		if (text.includes(spamWords[each_1])) {
			return true;
		}
	}
	return false;
}
var validiate = function () {
	var frm = document.forms[0];
	var uname = frm.uname.value;
	var upass = frm.upass.value;

	if (isSpam(uname)) {
		alert("Spams are really hated by GOD");
		return;
	}
	else if (uname.length < 3) {
		alert("Enter at least 3 chars");
	} else if (upass.length < 3) {
		alert("Enter atleast 3 chars");
	} else if (uname.length > 50) {
		alert("Enter atleast 3 chars")
	} else if (upass.length > 50) {
		alert("Chars limit: 50");
	} else if (uname.includes(" ")) {
		alert("Spaces in name not allowed");
	} else {
		return true;
	}
}
var newuser_submit = function () {
	var frm = document.forms[0];
	var uname = frm.uname.value;
	var upass = frm.upass.value
	System.getUID(uname, function (id) {
		if (id == -1) {
			System.setUser(uname, upass, function () {
				alert("User Creation Completed");
				el("#changer")[0].click();
			})
		} else {
			alert("User already exists");
		}
		$("#submit").html("Submit");
	});
}
var init = function () {
	_ = (x) => {
		var r = x.split('').reverse();
		var ninc = "";
		for (var ch in r) {
			ninc += String.fromCharCode(r[ch].charCodeAt(0) - 3);
		}
		return ninc;
	}
	var getUsers = function (exec) {
		exec = !exec ? function () { } : exec
		var ret;
		$.post("fetch.php", {
			[_("vvhffd")]: _("gourzodhu"),
			"query": "users"
		}, function (data, succ) {
			var users = (System.str.trim(data, true).split(","));
			ret = users;
			exec(ret);
		});
	}
	System.getUsers = getUsers;

	var setUser = function (name, pass, suc) {
		suc = !suc ? function () { } : suc;
		var suc2 = suc;
		var rdata;
		System.getUsers(function (x) {
			var ntrim = System.str.trim(name, true);
			for (var kys in x) {
				if (ntrim.toLowerCase() == x[kys].toLowerCase()) {
					rdata = 2;
				}
			}
			if (rdata !== 2) {
				$.post("fetch.php", {
					[_("vvhffd")]: _("gourzodhu"),
					"query": "newuser",
					"uname": System.str.trim(name, true),
					"upass": pass
				}, function (data, succ) {
					suc2(data, succ);
				});
			} else {
				suc("User already Exists");

			}
		});
	}
	System.setUser = setUser;
	var getUID = function (user, sucf) {
		sucf = !sucf ? function () { } : sucf;
		var usrs = System.getUsers(function (ulist) {
			ulist = ulist.map(x => x.toLowerCase());
			if (ulist.indexOf(user.toLowerCase()) == -1) {
				sucf(-1);
			} else {
				sucf(ulist.indexOf(user.toLowerCase()) + 1);
			}
		});
	}
	var userName = function (uid, evex) {
		evex = !evex ? function () { } : evex;
		System.getUsers(function (x) {
			evex(x[uid - 1]);
		});
	}
	var hash = function (text, succe) {
		$.post("fetch.php", {
			[_("vvhffd")]: _("gourzodhu"),
			"query": "hash",
			"txt": text
		}, function (dat, suc) {
			succe(dat);
		})
	}
	System.hash = hash;
	System.userName = userName;
	System.getUID = getUID;
	var send = function (userid, to, message, eva) {
		eva = !eva ? function () { } : eva;
		$.post("fetch.php", {
			[_("vvhffd")]: _("gourzodhu"),
			"query": "msg",
			"msg": message.trim(),
			"uid": userid,
			"to": to
		}, function (dat, suc) {
			eva(dat, suc);
		});
	}
	System.send = send;
	var listMsg = function (frid, toid, exc) {
		exc = !exc ? function () { } : exc;
		$.post("fetch.php", {
			[_("vvhffd")]: _("gourzodhu"),
			"query": "msgd",
			"from": frid,
			"to": toid
		}, function (_data, suc) {
			exc(_data);
		});
	}
	System.listMsg = listMsg;
}
var logged = function () {
	cusr = frd;
	System.getUID(cusr.n, function (id) {
		$("#submit").html("Submit");
		cuid = id;
		document.forms[0].remove();
		alert("Logged in!!");
		$("form").hide();
		$(".messenger").show();
		listusrs();
	});
}
var newuserch = function () {
	var form = document.forms[0];
	form.classList.remove("login");
	form.classList.add("newuser");
	form.setAttribute("name", "newuser");
	$("#changer").attr("href", "javascript:loginch()");
	$("#changer").html("I already have an account");
}
var loginch = function () {
	var form = document.forms[0];
	form.classList.remove("newuser");
	form.classList.add("login");
	form.setAttribute("name", "login");
	$("#changer").attr("href", "javascript:newuserch()");
	$("#changer").html("I am a new user")

}
var listusrs = function () {
	el("#userlist")[0].innerHTML = "Loading...";
	System.getUsers(function (uray) {
		var addat = el("#userlist")[0];
		addat.innerHTML = "";
		var nodes;
		for (var u = 0, ln = uray.length; u < ln; u++) {
			if (uray[u].toLowerCase() != cusr.n.toLowerCase()) {
				nodes = document.createElement("li");
				nodes.textContent = uray[u];
				addat.appendChild(nodes);
			}
		}
		setEvents();
	})
}
var nagin = function () {
	el("#userlist")[0].innerHTML = "Loading...";
	System.getUsers(function (uray) {
		var addat = el("#userlist")[0];
		addat.innerHTML = "";
		var nodes;
		for (var u = 0, ln = uray.length; u < ln; u++) {
			if (uray[u].toLowerCase() != cusr.n.toLowerCase()) {
				nodes = document.createElement("li");
				nodes.textContent = uray[u];
				addat.appendChild(nodes);
			}
		}
		var ul = el("#userlist")[0];
		var li = ul.children;
		var disinh;
		for (var c = 0, lin = li.length; c < lin; c++) {
			li[c].addEventListener("click", function () {
				$(".users").hide();
				$("#room").show();
				$("#sendm").show()
				$(".sendbtn").css("display", "block");
				var disinh = this.innerHTML;
				$("#room .subtitle").html(disinh);
				$("#room .backbtn").show();
				$("#room .textmessages").html("Loading...")
				$("#room .textmessages").show();
				$("#room .subtitle").show();
				System.getUID(disinh, function (id) {
					curch = id;
					curry = [];
					$("#room .textmessages").empty();
					revent = setInterval(listit, 500);
				});
			});
		}
	});
}
var curch;
var setEvents = function () {

	var ul = el("#userlist")[0];
	var li = ul.children;
	var disinh;
	for (var c = 0, lin = li.length; c < lin; c++) {
		li[c].addEventListener("click", function () {
			$(".users").hide();
			$("#room").show();
			$("#sendm").show()
			$(".sendbtn").css("display", "block");
			var disinh = this.innerHTML;
			$("#room .subtitle").html(disinh);
			$("#room .backbtn").show();
			$("#room .textmessages").show();
			$("#room .subtitle").show();
			System.getUID(disinh, function (id) {
				curch = id;
				curry = [];
				$("#room .textmessages").empty();
				listit2();
				revent = setInterval(listit, 500);
			});
		});
	}
	$(".sendbtn").click(function () {
		var vl = $("#sendm").val().trim();

		if (vl.trim() == "") {
			return;
		}
		System.send(cuid, curch, vl, function () {
			let snt = document.createElement("sent");
			snt.textContent= vl;
			el("#room .textmessages")[0].appendChild(snt);
			curry.push(cuid + " " + curch + " " + vl);
			$("#sendm").val("");
			$("#sendm").focus();
			window.scrollBy(0, window.innerHeight);
		});
	});
	$("#sendm").on("keypress", function (ev) {
		if (ev.keyCode == 13) {
			$(".sendbtn").trigger("click");
		}
	});
}


var listit = function () {
	System.listMsg(cuid, curch, function (rdat) {
		var sptd = rdat.trim().split("\n");
		var room = el("#room .textmessages")[0];
		var orm, trum, parela;
		sptd.forEach(function (x) {
			orm = x.trim().split(' ');
			parela = [];
			for (var s = 2, sl = orm.length; s < sl; s++) {
				parela[s - 2] = orm[s];
			}
			parela = parela.join(' ');
			if (!curry.includes(x)) {
				curry.push(x);
				if (orm[0] == cuid) {
					let snt = document.createElement("sent");
					snt.textContent = parela;
					room.appendChild(snt);
					
				} else if (orm[0] == curch) {
					let resc = document.createElement("resc");
					resc.textContent = parela;
					room.appendChild(resc);
				}
				window.scrollBy(0, window.innerHeight);
			}
		});
	});
}
var listit2 = function () {
	System.listMsg(cuid, curch, function (rdat) {
		var sptd = rdat.trim().split("\n");
		var room = el("#room .textmessages")[0];
		room.innerHTML = "";
		var orm, trum, parela;
		sptd.forEach(function (x) {
			orm = x.trim().split(' ');
			parela = [];
			for (var s = 2, sl = orm.length; s < sl; s++) {
				parela[s - 2] = orm[s];
			}
			parela = parela.join(' ');
			if (!curry.includes(x)) {
				curry.push(x);
				if (orm[0] == cuid) {
					let snt = document.createElement("sent");
					snt.textContent = parela;
					room.appendChild(snt);
					
				} else if (orm[0] == curch) {
					let resc = document.createElement("resc");
					resc.textContent = parela;
					room.appendChild(resc);
				}
				window.scrollBy(0, window.innerHeight);
			}
		});
	});
}
