function BlueButton({ text, click_func = null }) {
  return (
    <button
      className="p-2 my-2 bg-blue-600 hover:bg-blue-500 duration-150 ease-out text-white border-2 border-blue-500 hover:border-blue-600 font-semibold"
      onClick={click_func}
    >
      {text}
    </button>
  );
}

export default BlueButton;
