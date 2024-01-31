import Mainnav from './Mainnav';
import { getUser } from '@/lib/actions/user.action';

const Navbar = async () => {
  return (
    <nav className="sticky  top-0 z-30">
      <Mainnav />
    </nav>
  );
};

export default Navbar;
