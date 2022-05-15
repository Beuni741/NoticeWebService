<%@ page import="com.Notice"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Notice</title>
<link rel="stylesheet" href="Views/bootstrap.min.css"> 
<script src="Components/jquery-3.4.1.min.js"></script> 
<script src="Components/notice.js"></script> 
</head>
<body>
<div class="container"> 
	<div class="row">  
		<div class="col-6"> 
			<h1>Supplier Service</h1>
				<form id="formNotice" name="formNotice" method="post" action="NoticeUI.jsp">  
					Date:   
  					<input id="noticeDate" name="noticeDate" type="date"  class="form-control form-control-sm">
  					<br>Reason:  
 	 				<input id="noticeTitle" name="noticeTitle" type="text"  class="form-control form-control-sm">
					<br>Effected areas:   
  					<input id="noticeArea" name="noticeArea" type="text" class="form-control form-control-sm">   
  					<br>Description:   
  					<input id="noticeDesc" name="noticeDesc" type="text"  class="form-control form-control-sm">
  					<br>
					<input id="btnSave" name="btnSave" type="button" value="SAVE" class="btn btn-primary">  
					<input type="hidden" id="hidnoticeIdSave" name="hidnoticeIdSave" value=""> 
				</form>
				
				<div id="alertSuccess" class="alert alert-success"> </div>
				
			   <div id="alertError" class="alert alert-danger"></div>
				
			   <br>
				<div id="divNoticeGrid">
					<%
					    Notice NoticeObj = new Notice();
						out.print(NoticeObj.readNotice());
					%>
				</div>
				
				 
			</div>
		</div>
</div>

</body>
</html>