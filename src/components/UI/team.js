import React from "react";
import { motion } from "framer-motion";
import teamData from "@/data/team";

const Team = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Our Team
          </h2>
          <div className="section-divider-center" />
          <p className="text-white/60 text-base max-w-lg mx-auto mt-4">
            The passionate minds behind Marine Marvels, united by a love for
            ocean science and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 justify-items-center">
          {teamData.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center"
            >
              <div className="relative w-36 h-36 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-ocean-500/50 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ocean-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-white font-semibold text-base mb-1">
                {member.name}
              </h3>
              {member.role && (
                <span className="inline-block text-xs font-semibold text-ocean-primary bg-ocean-primary/10 px-3 py-1 rounded-full mb-1">
                  {member.role}
                </span>
              )}
              <p className="text-white/50 text-sm">{member.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
