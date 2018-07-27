<c:set var="text" value=" " />
<c:if test="${5 gt 2 and (not empty text or 5 lt 3)}">
  5 gt 2 and (not empty text) or 5 lte 3
</c:if>
<c:if test="${5 lte 2 or (not empty text) and 5 gte 3}">
  5 lte 2 or (not empty text) and 5 gte 3
</c:if>