using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DodGyEdumacationAPI.Models
{
    public partial class DODGYEDUMACATIONContext : DbContext
    {
        public DODGYEDUMACATIONContext()
        {
        }

        public DODGYEDUMACATIONContext(DbContextOptions<DODGYEDUMACATIONContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Session> Session { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Report> Report { get; set; }
        public virtual DbSet<Login> Login { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                /*#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.*/
                optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=DODGYEDUMACATION;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Session>(entity =>
            {
                entity.Property(e => e.SessionId).HasColumnName("sessionId");

                entity.Property(e => e.RoomCode)
                    .IsRequired()
                    .HasColumnName("roomCode")
                    .HasMaxLength(50);

                entity.Property(e => e.SessionEnd)
                    .HasColumnName("sessionEnd");
                //.HasColumnType("datetime");

                entity.Property(e => e.SessionStart)
                    .HasColumnName("sessionStart")
                    .HasColumnType("datetime");

                entity.Property(e => e.SessionType)
                    .IsRequired()
                    .HasColumnName("sessionType")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasColumnName("userId")
                    .HasMaxLength(50);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Session)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Session__userId__440B1D61");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Userid)
                    .HasColumnName("userid")
                    .HasMaxLength(50);

                entity.Property(e => e.Password)
                    .HasColumnName("password");
                    //.HasMaxLength(64);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasColumnName("firstName")
                    .HasMaxLength(50);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasColumnName("lastName")
                    .HasMaxLength(50);

                entity.Property(e => e.UserType)
                    .IsRequired()
                    .HasColumnName("userType")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Report>(entity =>
            {
                entity.HasNoKey();
            });

            modelBuilder.Entity<Login>(entity =>
            {
                entity.HasNoKey();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
