export const truncateTitle = (title:string, maxLength:number) => {
    if (title.length <= maxLength) return title;
    const truncatedTitle = title.substr(0, maxLength);
    const lastSpaceIndex = truncatedTitle.lastIndexOf(' ');
    return truncatedTitle.substr(0, Math.max(0, lastSpaceIndex)) + '...';
  };

  