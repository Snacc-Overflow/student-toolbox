import Link from "next/link";
import { menuSlide, slide } from "../../anim";
import { motion } from "framer-motion";
import "./headerLink.css";

import PropTypes from "prop-types";

export default function Index({ data }) {
  Index.propTypes = {
    data: PropTypes.object.isRequired,
  };
  return (
    <motion.div variants={slide} animate="enter" exit="exit" initial="initial">
      <Link href={data.href} className="small-font">
        {data.title}
      </Link>
    </motion.div>
  );
}
