"use client";

import React, { useMemo } from "react";
import {
  Avtar,
  Button,
  Card,
  Divider,
  Grid,
  GridItem,
  Hyperlink,
  ProgressBar,
  Table,
  TextView,
} from "../../src";
import type { TableColumn } from "../../src";

export interface CourseRow extends Record<string, unknown> {
  id: string;
  course: string;
  instructor: string;
  nextDue: string;
  status: string;
  grade: string;
}

export interface StudentDashboardPageProps {
  studentName?: string;
  studentId?: string;
  program?: string;
  avatarSrc?: string;
  courses?: CourseRow[];
  loginHref?: string;
}

const defaultCourses: CourseRow[] = [
  {
    id: "1",
    course: "Data Structures",
    instructor: "Dr. A. Mehta",
    nextDue: "Apr 2",
    status: "On track",
    grade: "A−",
  },
  {
    id: "2",
    course: "UX Design Systems",
    instructor: "Prof. L. Chen",
    nextDue: "Apr 5",
    status: "Due soon",
    grade: "B+",
  },
  {
    id: "3",
    course: "Statistics for CS",
    instructor: "Dr. R. Patel",
    nextDue: "Apr 9",
    status: "On track",
    grade: "A",
  },
];

export default function StudentDashboardPage({
  studentName = "Alex Morgan",
  studentId = "STU-2024-1842",
  program = "B.S. Computer Science",
  avatarSrc,
  courses = defaultCourses,
  loginHref = "/login",
}: StudentDashboardPageProps) {
  const initials = useMemo(() => {
    return (
      studentName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("") || "S"
    );
  }, [studentName]);

  const columns: TableColumn<CourseRow>[] = useMemo(
    () => [
      { key: "course", header: "Course", sortable: true, minWidth: 160 },
      { key: "instructor", header: "Instructor", sortable: true, minWidth: 140 },
      { key: "nextDue", header: "Next due", sortable: true, width: 100 },
      {
        key: "status",
        header: "Status",
        sortable: true,
        width: 110,
        render: (value) => (
          <span
            className={
              value === "Due soon"
                ? "font-medium text-[var(--color-warning-text,#92400E)]"
                : "text-[var(--color-text-secondary)]"
            }
          >
            {String(value)}
          </span>
        ),
      },
      { key: "grade", header: "Grade", align: "center", width: 72 },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg-page)] text-[var(--color-text-primary)]">
      <header
        className="border-b border-[var(--color-border-subtle,rgba(0,0,0,0.08))] bg-[var(--color-bg-surface)]"
        style={{ padding: "16px 24px" }}
      >
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <Avtar size={48} name={studentName} src={avatarSrc} alt="" initials={initials} status="none" />
            <div className="min-w-0">
              <TextView variant="h3" className="m-0 truncate text-[var(--color-text-primary)]">
                {studentName}
              </TextView>
              <p className="m-0 mt-1 text-[13px] leading-5 text-[var(--color-text-secondary)]">
                {studentId} · {program}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" size="md" href={loginHref}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <TextView variant="h2" className="m-0 mb-2 text-[var(--color-text-primary)]">
          Student dashboard
        </TextView>
        <p className="m-0 mb-8 text-[15px] leading-6 text-[var(--color-text-secondary)]">
          Track your courses, deadlines, and progress in one place.
        </p>

        <Grid columns={3} gap={24} autoFit minItemWidth={280}>
          <GridItem>
            <Card
              title="This week"
              subtitle="Key dates"
              variant="elevated"
              padding={24}
              radius={12}
            >
              <ul className="m-0 list-none space-y-3 p-0">
                <li className="text-[14px] leading-5 text-[var(--color-text-primary)]">
                  <strong className="font-semibold">Tue</strong> — Lab: Data Structures
                </li>
                <li className="text-[14px] leading-5 text-[var(--color-text-primary)]">
                  <strong className="font-semibold">Thu</strong> — Design critique &amp; submit wireframes
                </li>
                <li className="text-[14px] leading-5 text-[var(--color-text-primary)]">
                  <strong className="font-semibold">Fri</strong> — Stats problem set 6
                </li>
              </ul>
            </Card>
          </GridItem>

          <GridItem>
            <Card title="Term progress" subtitle="Credits average" variant="elevated" padding={24} radius={12}>
              <div className="space-y-6">
                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-[14px] font-medium text-[var(--color-text-primary)]">
                      Degree completion
                    </span>
                    <span className="text-[13px] text-[var(--color-text-secondary)]">62%</span>
                  </div>
                  <ProgressBar
                    value={62}
                    showValue
                    size="md"
                    ariaLabel="Degree completion progress"
                  />
                </div>
                <Divider />
                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-[14px] font-medium text-[var(--color-text-primary)]">
                      Current term GPA (est.)
                    </span>
                    <span className="text-[13px] text-[var(--color-text-secondary)]">3.6 / 4.0</span>
                  </div>
                  <ProgressBar
                    value={90}
                    showValue
                    size="md"
                    ariaLabel="Term GPA progress toward 4.0 scale"
                  />
                </div>
              </div>
            </Card>
          </GridItem>

          <GridItem>
            <Card title="Library &amp; support" subtitle="Quick links" variant="elevated" padding={24} radius={12}>
              <div className="flex flex-col gap-3">
                <Hyperlink href="#" className="text-[14px] font-medium">
                  Course catalog
                </Hyperlink>
                <Hyperlink href="#" className="text-[14px] font-medium">
                  Academic calendar
                </Hyperlink>
                <Hyperlink href="#" className="text-[14px] font-medium">
                  Office hours &amp; tutoring
                </Hyperlink>
              </div>
            </Card>
          </GridItem>
        </Grid>

        <div className="mt-8">
          <Card
            title="My courses"
            subtitle="Sort and search your enrollments"
            variant="outlined"
            padding={0}
            radius={12}
          >
            <div style={{ padding: "0 24px 24px" }}>
              <Table<CourseRow>
                columns={columns}
                data={courses}
                rowKey="id"
                searchable
                searchPlaceholder="Search courses or instructors"
                striped
                hover
                pagination={{ pageSize: 5 }}
                emptyText="No courses to show."
              />
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
