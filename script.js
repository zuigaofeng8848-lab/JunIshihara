// ========================================
// パリティビット体験学習
// ========================================

// HTML要素を取得
const dataInput = document.getElementById("dataInput");
const parityButton = document.getElementById("parityButton");

const senderResult = document.getElementById("senderResult");
const dataBits = document.getElementById("dataBits");
const parityBit = document.getElementById("parityBit");
const oneCount = document.getElementById("oneCount");
const parityExplanation = document.getElementById("parityExplanation");

const inputMessage = document.getElementById("inputMessage");

const receivedInput = document.getElementById("receivedInput");
const checkButton = document.getElementById("checkButton");

const checkResult = document.getElementById("checkResult");
const resultIcon = document.getElementById("resultIcon");
const resultTitle = document.getElementById("resultTitle");
const receivedBits = document.getElementById("receivedBits");
const receivedOneCount = document.getElementById("receivedOneCount");
const resultDescription = document.getElementById("resultDescription");

const receiveMessage = document.getElementById("receiveMessage");

const resetButton = document.getElementById("resetButton");


// ========================================
// 7桁のデータをチェック
// ========================================

function isValidBinary(value, length) {

  return new RegExp(`^[01]{${length}}$`).test(value);

}


// ========================================
// 「1」の数を数える
// ========================================

function countOnes(value) {

  return value
    .split("")
    .filter(bit => bit === "1")
    .length;

}


// ========================================
// 送信者：パリティビットを計算
// ========================================

parityButton.addEventListener("click", () => {

  const data = dataInput.value.trim();

  // 入力チェック
  if (!isValidBinary(data, 7)) {

    inputMessage.textContent =
      "⚠️ 7桁の「0」と「1」だけを入力してください。";

    inputMessage.className = "message error";

    senderResult.classList.add("hidden");

    return;
  }

  // エラーメッセージを消す
  inputMessage.textContent =
    "✓ 正しい7桁のデータです。";

  inputMessage.className = "message success";


  // 「1」の数を数える
  const count = countOnes(data);

  oneCount.textContent = count;


  // 偶数パリティを計算
  //
  // 1の数が偶数 → パリティは0
  // 1の数が奇数 → パリティは1
  //
  // 例：
  // 1011001
  // 1の数 = 4 → パリティ = 0
  //
  // 1011011
  // 1の数 = 5 → パリティ = 1

  let parity;

  if (count % 2 === 0) {
    parity = 0;

    parityExplanation.innerHTML =
      "「1」の数は <strong>偶数</strong> なので、パリティビットは <strong>0</strong> です。";
  } else {
    parity = 1;

    parityExplanation.innerHTML =
      "「1」の数は <strong>奇数</strong> なので、パリティビットを <strong>1</strong> にして偶数にします。";
  }


  parityBit.textContent = parity;


  // 7個のデータビットを表示
  dataBits.innerHTML = "";

  data.split("").forEach(bit => {

    const span = document.createElement("span");

    span.className = "bit";
    span.textContent = bit;

    dataBits.appendChild(span);

  });


  // 結果を表示
  senderResult.classList.remove("hidden");

});


// ========================================
// 受信者：データをチェック
// ========================================

checkButton.addEventListener("click", () => {

  const received = receivedInput.value.trim();


  // 入力チェック
  if (!isValidBinary(received, 8)) {

    receiveMessage.textContent =
      "⚠️ 8桁の「0」と「1」を入力してください。";

    receiveMessage.className = "message error";

    checkResult.classList.add("hidden");

    return;
  }


  receiveMessage.textContent =
    "✓ 8桁のデータを受け取りました。";

  receiveMessage.className = "message success";


  // 「1」の数を数える
  const count = countOnes(received);

  receivedOneCount.textContent = count;


  // 受け取ったビットを表示
  receivedBits.innerHTML = "";

  received.split("").forEach((bit, index) => {

    const span = document.createElement("span");

    span.className = "received-bit";
    span.textContent = bit;

    // パリティビット（8個目）を少し目立たせる
    if (index === 7) {
      span.style.border = "3px solid #f59e0b";
    }

    receivedBits.appendChild(span);

  });


  // ========================================
  // 偶数パリティの判定
  // ========================================

  checkResult.classList.remove("hidden");


  if (count % 2 === 0) {

    // ----------------------------
    // 正常
    // ----------------------------

    resultIcon.textContent = "✅";

    resultTitle.textContent =
      "正しく伝わった可能性が高いです！";

    resultTitle.style.color = "#16a34a";

    resultDescription.innerHTML =
      `「1」の数は <strong>${count}個</strong> です。<br>
       偶数になっているので、パリティチェックを通過しました。<br><br>
       <strong>パリティビットの役割：</strong>
       「1」の数が偶数になるようにしておくことで、
       1ビットの誤りを発見できます。`;

  } else {

    // ----------------------------
    // エラー
    // ----------------------------

    resultIcon.textContent = "❌";

    resultTitle.textContent =
      "通信エラーの可能性があります！";

    resultTitle.style.color = "#dc2626";

    resultDescription.innerHTML =
      `「1」の数は <strong>${count}個</strong> です。<br>
       奇数になっているので、パリティチェックでエラーを検出しました。<br><br>
       <strong>例えば、途中で0と1が入れ替わった可能性があります。</strong><br>
       もう一度、相手から数字を聞いて確認してみましょう。`;

  }

});


// ========================================
// リセット
// ========================================

resetButton.addEventListener("click", () => {

  dataInput.value = "";
  receivedInput.value = "";

  senderResult.classList.add("hidden");
  checkResult.classList.add("hidden");

  inputMessage.textContent = "";
  receiveMessage.textContent = "";

  dataInput.focus();

});


// ========================================
// 入力時に0と1以外を除外
// ========================================

dataInput.addEventListener("input", () => {

  dataInput.value =
    dataInput.value.replace(/[^01]/g, "").slice(0, 7);

});


receivedInput.addEventListener("input", () => {

  receivedInput.value =
    receivedInput.value.replace(/[^01]/g, "").slice(0, 8);

});
