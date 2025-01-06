interface Props {
  msg: string;
}

function ErrorMessageComponent({ msg }: Props) {
  const convertCase = (str: string): string => {
    return str
      .split('_')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const replaceMsg = (): string => {
    const words: string[] = msg.split(' ');
    const convert = convertCase(words[0]);
    words[0] = convert;
    return words.join(' ');
  };

  return <div className="text-red-600 text-[11px]">{replaceMsg()}</div>;
}

export default ErrorMessageComponent;
