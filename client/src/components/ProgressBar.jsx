import "../styles/ListItem.css";

const ProgressBar = ({ progress }) => {
  const colors = ["#fee17a", "#a7cdff", "#89f8c6", "#fea873"];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="outer-bar">
      <div
        className="inner-bar"
        style={{ width: `${progress}%`, backgroundColor: randomColor }}
      ></div>
    </div>
  );
};

export default ProgressBar;
