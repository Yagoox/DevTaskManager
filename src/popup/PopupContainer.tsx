import PopupHeader from '../components/PopupHeader';
import PopupContent from '../components/PopupContent';
import PopupFooter from '../components/PopupFooter';
import { Sidebar } from '../components/Sidebar';

const PopupContainer = () => {
  return (
    <div className="popup-container">
      <Sidebar>
        <PopupHeader />
        <PopupContent />
        <PopupFooter />
      </Sidebar>
    </div>
  );
}
  
export default PopupContainer;
