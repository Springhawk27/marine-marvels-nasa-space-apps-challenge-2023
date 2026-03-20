import React from "react";
import { motion } from "framer-motion";
import teamData from "@/data/team";

const Team = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-ocean-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-ocean-primary text-sm font-semibold uppercase tracking-widest">
            The People Behind
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-2 mb-4">
            Our Team
          </h2>
          <div className="section-divider-center" />
          <p className="text-white/50 text-base max-w-lg mx-auto mt-4">
            The passionate minds behind Marine Marvels, united by a love for
            ocean science and technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 justify-items-center">
          {teamData.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center"
            >
              <motion.div
                className="relative w-36 h-36 mx-auto mb-5 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-ocean-500/50 transition-all duration-500"
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ocean-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </motion.div>
              <h3 className="text-white font-semibold text-base mb-1 group-hover:text-seafoam-300 transition-colors duration-300">
                {member.name}
              </h3>
              {member.role && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="inline-block text-xs font-semibold text-ocean-primary bg-ocean-primary/10 px-3 py-1 rounded-full mb-1"
                >
                  {member.role}
                </motion.span>
              )}
              <p className="text-white/45 text-sm">{member.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
