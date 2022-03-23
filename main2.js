const items = document.querySelectorAll(".item");
const containers = document.querySelectorAll(".container");

//아이템에 3가지 속성을 입력 해야함
//드래그스타트, 드래그 엔드, 드래그중 오버 , 드랍은 안쓸거

items.forEach((item) => {
  item.addEventListener("dragstart", () => {
    item.classList.add("dragging");
  });

  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    // container.appendChild(dragging);
    //이벤트 정보를 활용하여서 위치를 바꿔라!
    // console.log(e)
    const afterElement = getAfterElement(container, e.clientY);

    afterElement
      ? container.insertBefore(dragging, afterElement)
      : container.appendChild(dragging);
  });
});

function getAfterElement(container, y) {
  const notDragItems = [...container.querySelectorAll(".item:not(.dragging)")];
  // console.log(notDragItems)
  // 드래그 되지않는 아이템들을 비교해서 앞에놓여있는거 하나만 셀렉트
  return notDragItems.reduce(
    (pre, cur) => {
      const box = cur.getBoundingClientRect();
      // console.log(box)
      const offset = y - box.y - box.height / 2;
      console.log(offset);

      if (offset < 0 && pre.offset < offset) {
        // console.log("요소 위에 존재");
        // pre.offset = offset;
        // pre.element = cur;
        // return pre;
        return { offset: offset, element: cur };
      } else {
        return pre;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
