import { StyleSheet } from 'react-native';

const loopStyle = (start, end, totalDuration) => {
    const loop = {
      height: '50%',
      width: '0%',
      position: 'absolute',
      backgroundColor: 'rgba(149, 215, 240,.5)',
      marginLeft: '1%',
      marginRight: '1%',
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderColor: '#0096FF'
    }
    if (totalDuration != 0 && start && end) {
      let leftPercent = (100 * start / totalDuration) + 1;
      let marginLeft = leftPercent.toString() + '%';
      loop.marginLeft = marginLeft;
      let rightPercent = (100 * end / totalDuration) + 1;
      let width = (rightPercent - leftPercent).toString() + '%';
      let marginRight = (100 - rightPercent).toString() + '%';
      loop.width = width;
      loop.marginRight = marginRight;
      loop.borderLeftWidth = 2;
      loop.borderRightWidth = 2;
    }
    return StyleSheet.create(
      {
      loopOverlay: {
        height: '0%',
        backgroundColor: 'rgba(149, 215, 240,.5)',
        marginLeft: loop.marginLeft,
        marginRight: loop.marginRight,
        marginBottom: '-7%',
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#0096FF',
        opacity: 0
      }
    }).loopOverlay;
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgba(255, 200, 240, .5)',
    },
    slider: { 
      width: 300, 
      height: 40, 
      backgroundColor: 'rgba(255, 200, 240,.5)',
      backgroundSize: '10% 10% 10% 10%'
    }
  });

  export {loopStyle, styles} 