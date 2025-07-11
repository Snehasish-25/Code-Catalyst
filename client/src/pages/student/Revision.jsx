import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector } from 'react-redux';
import { useGetUpcomingRevisionsQuery, useMarkRevisionCompletedMutation } from '@/features/api/revisionApi';
import { toast } from 'sonner';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

const RevisionDashboard = () => {
  const user= useSelector((state) => state.authSlice);
  const userId=user.user._id;
  
  const { data, isLoading, isError } = useGetUpcomingRevisionsQuery(userId);
  const revisions=data?.data || [];
  const [markCompleted] = useMarkRevisionCompletedMutation();

  const handleMarkCompleted = async (revisionId, scheduleIndex) => {
    try {
      await markCompleted({ revisionId, scheduleIndex }).unwrap();
      toast.success("Successfully marked completed");
    } catch (error) {
      console.error('Failed to mark revision:', error);
      toast.error("Failed to mark revision");
    }
  };

  const getCompletionPercentage = (schedule) => {
    const completed = schedule.filter(item => item.completed).length;
    return Math.round((completed / schedule.length) * 100);
  };

  const pieData = [
    { name: 'Completed', value: revisions.reduce((acc, rev) => acc + rev.revisionSchedule.filter(r => r.completed).length, 0) },
    { name: 'Pending', value: revisions.reduce((acc, rev) => acc + rev.revisionSchedule.filter(r => !r.completed).length, 0) },
  ];
  

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">📚 Revision Planner</h2>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>📊 Revision Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                    >
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🔔 Next Upcoming Revisions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 max-h-64 overflow-y-auto pr-2">
                  {revisions.map(rev => {
                    const next = rev.revisionSchedule.find(r => !r.completed);
                    if (!next) return null;
                    return (
                      <li key={rev._id} className="border p-3 rounded-md shadow-sm">
                        <p className="font-semibold">Course: {rev.courseId.title}</p>
                        <p>Lecture: {rev.lectureId.lectureTitle}</p>
                        <p className="text-sm text-muted-foreground">Next: {new Date(next.date).toDateString()}</p>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">📝 Detailed Revisions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {revisions.map(rev => (
                <Card key={rev._id} className="shadow-md">
                  <CardHeader>
                    <CardTitle> {rev.courseId.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">Lecture: {rev.lectureId.lectureTitle}</p>
                  </CardHeader>
                  <CardContent>
                    <Progress value={getCompletionPercentage(rev.revisionSchedule)} className="mb-4" />
                    <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {rev.revisionSchedule.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-center text-sm">
                          <span>{new Date(item.date).toDateString()}</span>
                          {item.completed ? (
                            <span className="text-green-500 font-semibold">Done ✅</span>
                          ) : (
                            <Button variant="outline" size="sm" onClick={() => handleMarkCompleted(rev._id, idx)}>
                              Mark Done
                            </Button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RevisionDashboard;
